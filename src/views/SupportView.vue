<template>
  <div>
    <h1 class="text-center">Request Support</h1>
    <p class="text-center text-muted mb-4">
      Complete this form for yourself or an older family member.
    </p>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div v-if="successMessage" class="alert alert-success" role="status">
          {{ successMessage }}
        </div>

        <!-- 在每个输入框下方显示验证信息 -->
        <form novalidate @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label for="full-name" class="form-label">Full name</label>
              <input
                id="full-name"
                v-model="formData.fullName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.fullName }"
                maxlength="60"
                autocomplete="name"
                required
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.fullName" class="text-danger">{{ errors.fullName }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="email" class="form-label">Email address</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                maxlength="100"
                autocomplete="email"
                required
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="phone" class="form-label">Phone number</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                placeholder="Enter your phone number"
                autocomplete="tel"
                required
                @blur="() => validatePhone(true)"
                @input="() => validatePhone(false)"
              />
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="request-for" class="form-label">Who is this request for?</label>
              <select
                id="request-for"
                v-model="formData.requestFor"
                class="form-select"
                :class="{ 'is-invalid': errors.requestFor }"
                required
                @blur="() => validateRequestFor(true)"
                @change="() => validateRequestFor(false)"
              >
                <option value="" disabled>Select one</option>
                <option value="Myself">Myself</option>
                <option value="Someone else">Someone else</option>
              </select>
              <div v-if="errors.requestFor" class="text-danger">{{ errors.requestFor }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="request-type" class="form-label">Type of support</label>
              <select
                id="request-type"
                v-model="formData.requestType"
                class="form-select"
                :class="{ 'is-invalid': errors.requestType }"
                required
                @blur="() => validateRequestType(true)"
                @change="() => validateRequestType(false)"
              >
                <option value="" disabled>Select support type</option>
                <option value="General question">General question</option>
                <option value="Service request">Service request</option>
                <option value="Appointment request">Appointment request</option>
              </select>
              <div v-if="errors.requestType" class="text-danger">{{ errors.requestType }}</div>
            </div>

            <div v-if="formData.requestType === 'Appointment request'" class="col-12 col-md-6">
              <label for="preferred-date" class="form-label">Preferred appointment date</label>
              <input
                id="preferred-date"
                v-model="formData.preferredDate"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': errors.preferredDate }"
                :min="tomorrow"
                required
                @blur="() => validateDate(true)"
                @input="() => validateDate(false)"
              />
              <div v-if="errors.preferredDate" class="text-danger">
                {{ errors.preferredDate }}
              </div>
            </div>

            <div class="col-12">
              <label for="details" class="form-label">How can we help?</label>
              <textarea
                id="details"
                v-model="formData.details"
                class="form-control"
                :class="{ 'is-invalid': errors.details }"
                rows="4"
                maxlength="500"
                required
                @blur="() => validateDetails(true)"
                @input="() => validateDetails(false)"
              ></textarea>
              <div class="d-flex justify-content-between">
                <div v-if="errors.details" class="text-danger small">
                  {{ errors.details }}
                </div>
                <small class="text-muted ms-auto">{{ formData.details.length }}/500</small>
              </div>
            </div>

            <div class="col-12">
              <div class="form-check">
                <input
                  id="consent"
                  v-model="formData.consent"
                  type="checkbox"
                  class="form-check-input"
                  :class="{ 'is-invalid': errors.consent }"
                  required
                  @change="() => validateConsent(true)"
                />
                <label for="consent" class="form-check-label">
                  I agree that the charity may contact me about this request.
                </label>
                <div v-if="errors.consent" class="text-danger small mt-1">
                  {{ errors.consent }}
                </div>
              </div>
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-success me-2">Submit Request</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </div>
        </form>
      </div>

      <aside class="col-12 col-lg-4">
        <h2 class="h4">Contact Details</h2>
        <p><strong>Phone:</strong><br /><a href="tel:1800123456">1800 123 456</a></p>
        <p><strong>Email:</strong><br /><a href="mailto:help@example.org">help@example.org</a></p>
        <p><strong>Hours:</strong><br />Monday to Friday, 9:00 am - 5:00 pm</p>

        <div class="alert alert-warning mt-4">
          <strong>Emergency:</strong> For life-threatening help, call 000.
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  requestFor: '',
  requestType: '',
  preferredDate: '',
  details: '',
  consent: false,
})

const successMessage = ref('')

const errors = ref({
  fullName: null,
  email: null,
  phone: null,
  requestFor: null,
  requestType: null,
  preferredDate: null,
  details: null,
  consent: null,
})


// 日期必须从明天开始。
const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)
const year = tomorrowDate.getFullYear()
const month = String(tomorrowDate.getMonth() + 1).padStart(2, '0')
const day = String(tomorrowDate.getDate()).padStart(2, '0')
const tomorrow = `${year}-${month}-${day}`




const validateName = (blur) => {
  if (formData.value.fullName.trim().length < 3) {
    if (blur) errors.value.fullName = 'Please enter at least 3 characters.'
  } else {
    errors.value.fullName = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(formData.value.email.trim())) {
    if (blur) errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePhone = (blur) => {
  if (!formData.value.phone.trim()) {
    if (blur) errors.value.phone = 'Please enter a phone number.'
  } else {
    errors.value.phone = null
  }
}

const validateRequestFor = (blur) => {
  if (!formData.value.requestFor) {
    if (blur) errors.value.requestFor = 'Please select one option.'
  } else {
    errors.value.requestFor = null
  }
}

const validateRequestType = (blur) => {
  if (!formData.value.requestType) {
    if (blur) errors.value.requestType = 'Please select a support type.'
  } else {
    errors.value.requestType = null
  }

  if (formData.value.requestType !== 'Appointment request') {
    formData.value.preferredDate = ''
    errors.value.preferredDate = null
  }
}

const validateDate = (blur) => {
  if (formData.value.requestType !== 'Appointment request') {
    errors.value.preferredDate = null
  } else if (!formData.value.preferredDate) {
    if (blur) errors.value.preferredDate = 'Please choose a preferred date.'
  } else if (formData.value.preferredDate < tomorrow) {
    if (blur) errors.value.preferredDate = 'The appointment date must be in the future.'
  } else {
    errors.value.preferredDate = null
  }
}

const validateDetails = (blur) => {
  if (formData.value.details.trim().length < 20) {
    if (blur) errors.value.details = 'Please enter at least 20 characters.'
  } else {
    errors.value.details = null
  }
}

const validateConsent = (blur) => {
  if (!formData.value.consent) {
    if (blur) errors.value.consent = 'You must agree before submitting.'
  } else {
    errors.value.consent = null
  }
}

const submitForm = () => {
  successMessage.value = ''

  validateName(true)
  validateEmail(true)
  validatePhone(true)
  validateRequestFor(true)
  validateRequestType(true)
  validateDate(true)
  validateDetails(true)
  validateConsent(true)

  if (
    !errors.value.fullName &&
    !errors.value.email &&
    !errors.value.phone &&
    !errors.value.requestFor &&
    !errors.value.requestType &&
    !errors.value.preferredDate &&
    !errors.value.details &&
    !errors.value.consent
  ) {
    const referenceNumber = `REQ-${Date.now().toString().slice(-6)}`
    const savedRequests = JSON.parse(localStorage.getItem('supportRequests')) || []

    savedRequests.push({
      ...formData.value,
      referenceNumber,
      submittedAt: new Date().toISOString(),
    })

    localStorage.setItem('supportRequests', JSON.stringify(savedRequests))
    clearForm()
    successMessage.value = `Your request was submitted. Reference: ${referenceNumber}`
  }
}

const clearForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    phone: '',
    requestFor: '',
    requestType: '',
    preferredDate: '',
    details: '',
    consent: false,
  }

  errors.value = {
    fullName: null,
    email: null,
    phone: null,
    requestFor: null,
    requestType: null,
    preferredDate: null,
    details: null,
    consent: null,
  }

  successMessage.value = ''
}
</script>
