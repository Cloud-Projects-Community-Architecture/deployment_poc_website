var start_value;
var input1, input2, input3;
var project;
var xhr = new XMLHttpRequest();
var url ="https://17rgllqq87.execute-api.us-west-2.amazonaws.com/Cloud_invoke"
//var url = "https://qsa7pptmkg.execute-api.us-west-2.amazonaws.com/cloud_deploy";

function generate_command() {
    var command = "helm install "+ project +"/" + project +"-team-edition"
    var linebreakstring = " \\\n";
    var arg1string = "--set mysql_user=" + input1;
    var arg2string = "--set mysql_password=" + input2;
    var arg3string = "--set site_url=" + input3;
    return command + linebreakstring + arg1string + linebreakstring + arg2string +  linebreakstring + arg3string;
}

function show_download_link() {
    var downloadstring = "Download custom-"+project+"-team-edition-helm-values.yaml.jinja2 from GitHub";
    document.getElementById("Downloadlinktext").innerHTML = downloadstring;
}

function show_command() {
    document.getElementById("command_value").innerHTML =  generate_command()
}

  function set_project(el){
    //Catching the initial setup up the inputs (would not work with null value upfront)
    project = el.innerText.trim().toLowerCase();

    show_command();
    show_download_link();
  }

function update_input(el){
  //Really initiating the Values of the inputfiels while typing, function called as "onkeyup"
  input1 = document.getElementById("inputfield1").value;
  input2 = document.getElementById("inputfield2").value;
  input3 = document.getElementById("inputfield3").value;
  show_command();
  show_download_link();
}

function onDataSend(){
  input1 = document.getElementById("inputfield4").value;
  input2 = document.getElementById("inputfield5").value;
  input3 = document.getElementById("inputfield6").value;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        var blob = this.response;
        var fileName = "content.xml";
        saveOrOpenResponse(blob, fileName);
    }
  };
  var data = JSON.stringify({ "mysql_user": input1 , "mysql_password": input2 , "site_url": input3, "project" : "mattermost-team-edition"});
  xhr.send(data);
}

function saveOrOpenResponse(blob, fileName) {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
}
//Border
const codeLines = document.querySelectorAll('.code-line')

codeLines.forEach(line => {
	const commandIcon = line.querySelector('.command-icon')

	if (commandIcon) {
		commandIcon.onclick = () => {
			document.execCommand("copy")
		}
	}

	line.addEventListener('copy', event => {
		event.preventDefault()

		if (event.clipboardData) {
			let textToCopy = ''
			const userHighlight = window.getSelection().toString()

			if (userHighlight) {
				textToCopy = userHighlight
			} else {
				textToCopy = line.textContent.replace('Copy', '')
			}

			event.clipboardData.setData('text/plain', textToCopy)
			document.querySelector('.copied-text p').innerText = "Successfully copied to Clipboard"
		}
	})
})
