export default async function  fetchSingLog(data , mode){
const fetchSignUpUser = async (data) => {
    const response = await fetch(`http://localhost:3000/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.userpassword
      })
    });
    if(response.status === 422 || response.status === 401){
        return response;
    }
    if (!response.ok) {
      const error = new Error("Failed to sign up");
      throw error;
    }
    const resData=await response.json();
    const token=await resData.token;
    localStorage.setItem('token',token);
  };

  try {
    const result = await fetchSignUpUser(data);
    return result;
  } catch (error) {
    return error;
  }
}
  