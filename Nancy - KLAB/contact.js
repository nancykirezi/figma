function validateForm() {
    let x = document.forms["myform"]["name"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    
let y = document.forms["myform"]["email"].value;

if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(y))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
