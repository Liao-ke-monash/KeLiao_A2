import { ref } from 'vue'

// 管理员账户
const adminAccount = {
  id: 1,
  fullName: 'Site Administrator',
  email: 'admin@healthyageing.org',
  password: 'Admin123',
  role: 'admin',
}

const savedUser = JSON.parse(localStorage.getItem('currentUser'))

export const currentUser = ref(savedUser)
export const isAuthenticated = ref(savedUser !== null)


export const register = (fullName, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const cleanEmail = email.trim().toLowerCase()
  const accountExists =
    cleanEmail === adminAccount.email || users.some((user) => user.email === cleanEmail)

  if (accountExists) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    }
  }

  users.push({
    id: Date.now(),
    fullName: fullName.trim(),
    email: cleanEmail,
    password,
    role: 'user',
  })

  localStorage.setItem('users', JSON.stringify(users))

  return {
    success: true,
    message: 'Registration was successful.',
  }
}

export const login = (email, password) => {
  const cleanEmail = email.trim().toLowerCase()
  let user


  // 管理员账户与普通注册用户分开检查。
  if (cleanEmail === adminAccount.email && password === adminAccount.password) {
    user = adminAccount
  } else {
    const users = JSON.parse(localStorage.getItem('users')) || []

    user = users.find(
      (savedAccount) => savedAccount.email === cleanEmail && savedAccount.password === password,
    )
  }

  if (!user) {
    return false
  }

  const loggedInUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  }

  currentUser.value = loggedInUser
  isAuthenticated.value = true
  localStorage.setItem('currentUser', JSON.stringify(loggedInUser))

  return true
}

export const logout = () => {
  currentUser.value = null
  isAuthenticated.value = false
  localStorage.removeItem('currentUser')
}
