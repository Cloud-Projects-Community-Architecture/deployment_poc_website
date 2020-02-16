var start_value;
var input, input2, input3;
  function setName(el){
    //Chatching the initial setup up the inputs (would not work with null value upfront)
    input = document.getElementById("inputfield1").value;
    input2 = document.getElementById("inputfield2").value;
    input3 = document.getElementById("inputfield3").value;
    //  document.getElementById('searchtitle').innerHTML = "curl " + el.innerText+ " " + input + " " +input2+ " " +input3;
  document.getElementById('searchtitle').innerHTML =  "curl https://kiw1w5buz7.execute-api.us-west-2.amazonaws.com -X POST -H \"Content-Type: application/json\" -d '{\"mysql_user\": "+ input +", \"mysql_password\": \"blah\", \"site_url\": \"https://next.message.org\", \"project\": \"mattermost-team-edition\"}";
    start_value = el.innerText;
  }
function update_input(el){
  //Really initiating the Values of the inputfiels while typing, function called as "onkeyup"
  input = document.getElementById("inputfield1").value;
  input2 = document.getElementById("inputfield2").value;
  input3 = document.getElementById("inputfield3").value;
  //Updating the innerHTML of the searchtitel
  document.getElementById('searchtitle').innerHTML = "curl " + start_value + " " + input + " " + input2 + " " + input3;
  console.log(input);
}
