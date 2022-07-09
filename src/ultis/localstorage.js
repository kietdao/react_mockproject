export default function checkToken() {
    const token = JSON.parse(localStorage.getItem('isLogin'))
    if(token) {
        return true
    }
    return false
}