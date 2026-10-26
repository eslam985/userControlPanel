export async function fetchUsers(page = 1, limit = 5) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`,
    )

    if (!response.ok) {
      throw new Error(`http error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log('حدث خطا', error)
    throw error
  }
}

export async function fetchUserById(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

    if (!response.ok) {
      throw new Error(`http error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log('حدث خطا', error)
    throw error
  }
}
