//***********************************************************************************************************************************************************
// connect to Watershedlrs - learning records store
function pageLoaded() {
  var key = "88501b323fd4d9";
  var secret = "b454efc7b112ed";
  var conf = {
    "endpoint": "https://watershedlrs.com/api/organizations/15592/lrs/",
    "auth": "Basic " + toBase64(key + ':' + secret),
  };
  ADL.XAPIWrapper.changeConfig(conf);
}

// Button click
function sendStatement(vusremail, vverbid, vverbDisplay, vobjectId, vdefinitionName, vdescription) {
  //makeid(8);
  var statement = {
    "actor": {
      "mbox": "mailto:" + vusremail,
      "name": uUsername,
      "objectType": "Agent"
    },
    "verb": {
      "id": vverbid,
      "display": {
        "en-US": vverbDisplay
      }
    },
    "object": {
      "id": vobjectId,
      "definition": {
        "name": {
          "en-US": vdefinitionName
        },
        "description": {
          "en-US": vdescription
        }
      },
      "objectType": "Activity"
    }
  }
  ADL.XAPIWrapper.sendStatement(statement);
}


//****************************************************************************************

//gloabl variabls - Rarry
var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot'; //name of the chatbot

//*******************************************************************************************************************
//pre-loaded message while enters the page
// the first message
function botloadingmsg() {
  //var chatboxmsg = document.getElementById("chatbox").placeholder = "";
  messages.push("<b>" + botName + ": </b>" + "Hello! <br> What is your first name?");
  document.getElementById("chatlog" + 1).innerHTML = messages[messages.length - 1];

}

//gloabl variabls
var vUsername = ""; //user name
var uUserEmail = ""; //user email
var uUsername = ""; //user name as actor
var vuser = ""; //user name exlude lable
var userErrormsg = ""; //error messages


//Conditional Statements
function chatbotResponse() {
  //numbers only
  var numberFiler = /^\d+/;

  //validate users names
  //user name with letters only
    var botmsg1 = "Thanks " + lastUserMessage.substring(0, 50) + "!" + " <br> What is your email address?";
  if (messages.length.toString() == '1') {

    var letterfiler = /^[A-Za-z]+$/; //letters only
    //mssages
    var errmsg1 = " is not a name! <br> Please enter letters only!";


    //lastUserMessage.split(" ")[0] &  lastUserMessage.split(" ")[1];
    //var fullName = lastUserMessage.split(" ")[0] + lastUserMessage.split(" ")[1]; //split the string before and after the first space
    //vuser = lastUserMessage.split(" ")[0] + " " + lastUserMessage.split(" ")[1]; //add a space between first and last name for the 3dr message dispaly
    letterAndemail(letterfiler, errmsg1, botmsg1, lastUserMessage); //Overridden method

    return;
  }

  if (messages.length.toString() == '3') { //Validate email address
  uUsername = lastUserMessage; //email for statements
  uUsername = messages[messages.length - 2].substring(43, 50); //user name for statements
  letterfiler = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //email validation

  //letters only
  if (!letterfiler.test(lastUserMessage)) {
    //error message
    //userErrormsg = Errmsg;
    userErrormsg = " is not a valid email address. <br> Please enter your email address again! <br> i.g.,XXX@XXX.XXX";;
    document.getElementById("inputerrorMsge").innerHTML = lastUserMessage + userErrormsg;
    return;
  } else {
    //clear error message
    document.getElementById("inputerrorMsge").innerHTML = "";
    vUsername = lastUserMessage.substring(0, 50);
    //chatbox messages
    botMessage = "Thank you!" + "<br> <br> We all have unconscious biases. To act on our values for diversity and inclusion, it is important that we identify and interrupt our biases to avoid making decisions based on them. <br> <br> Let’s review how racial bias often turns up the sourcing process for new hires. This chatbot will help you to assess your own ability to interrupt racial bias and it will provide you with tools and resources, if needed. <br><br> Self assessment: Do you agree with the following statement? <br><br> <i>&quot;I am aware of how racial bias occurs in the sourcing process.&quot;</i> <br><br> &nbsp; &nbsp; 1. Strongly agree <br> &nbsp; &nbsp; 2. Agree <br>&nbsp; &nbsp; 3. Unsure <br> &nbsp; &nbsp; 4. Disagree <br>&nbsp; &nbsp;  5. Strongly disagree <br> <br><i>Enter a number to respond.</i>";;
    //Chatlog messages
    messages.push("&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <b>" + 'You' + ":</b> " + vUsername);
    messages.push("<b>" + botName + ":</b> " + botMessage);

    //initiated
    sendStatement(lastUserMessage, "https://w3id.org/xapi/adb/verbs/initiated", "initiated", "http://learningdojo.net/xapi/chatbot_initiated", "chatbot_initiated", "chatbot_initiated");
    return;
  }
}

  if (messages.length.toString() == '5') {
    //messages
    var newErrMsg = " You can only enter a number from 1 to 5! Please try again!";
    var newbotMessage = "Please enter a number for the characteristics that most closely match the job for which you are sourcing: <br><br> Career-level: <br> &nbsp; &nbsp; 1. Entry level <br> &nbsp; &nbsp; 2. Mid-Career/Management <br> &nbsp; &nbsp; 3. Executive (C-level)";

    //Overridden method
    options(numberFiler, newErrMsg, newbotMessage, 5);

    //qustion 1 full answer
    if (lastUserMessage == 1){
      lastUserMessage = "1.Strongly agree";
    } else if (lastUserMessage == 2){
      lastUserMessage = "2.Agree";
    } else if  (lastUserMessage == 3){
      lastUserMessage = "3.Unsure" ;
    }else if  (lastUserMessage == 4){
      lastUserMessage = "4.Disagree" ;
    }else if  (lastUserMessage == 5){
      lastUserMessage = "5.Strongly disagree";
    }

    //send statement after user answer question 1
    sendStatement(vUsername, "https://w3id.org/xapi/dod-isd/verbs/answered", "answered", "http://adlnet.gov/expapi/activities/question", "Question 1", "Questions 1 answer: " + lastUserMessage);
    return;
  }

  if (messages.length.toString() == '7') {

    var newErrMsg = " You can only enter a number from 1 to 3! Please try again!";
    var newbotMessage = "Thank you for your support and effort. Our goal is to help hiring professionals be actively aware and responsive to potential racial bias that occurs when sourcing all candidates. Its purpose is to prevent racial bias and provide everyone a fair chance. We support diversity inclusion and equity. <br><br> Enter any comments, questions, or feedback below.";

    options(numberFiler, newErrMsg, newbotMessage, 3); //Overridden method

    //get question 2 answer
    vQuestionTwo = lastUserMessage;

    //qustion 2 full answer
    if (lastUserMessage == 1) {
      lastUserMessage = "1.Entry level";
    } else if (lastUserMessage == 2) {
      lastUserMessage = "2.Mid-Career/Management";
    } else if (lastUserMessage == 3) {
      lastUserMessage = "3.Executive (C-level)";
    }
    //send statement after user answer question 2
    sendStatement(vUsername, "https://w3id.org/xapi/dod-isd/verbs/answered", "answered", "http://adlnet.gov/expapi/activities/question", "Question 2", "Questions 2 answer: " + lastUserMessage);
    return;
  }

  if (messages.length.toString() == '9') {

    if (lastUserMessage.toUpperCase(lastUserMessage) != "DONE") {

      document.getElementById("inputerrorMsge").innerHTML = ""; //clear error message

      //mesages
      botMessage = "Thank you for feedback! <br> <br> To complete this [bot], please type DONE";
      //Chatlog messages
      messages.push("<b>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;" + 'You' + ":</b> " + lastUserMessage);
      messages.push("<b>" + botName + ":</b> " + botMessage);

      //send user comments
      sendStatement(vUsername, "http://adlnet.gov/expapi/verbs/commented", "commented", "http://adlnet.gov/expapi/activities/commented", " ", "USer Comments: " + lastUserMessage);

      return;
    } else {

      document.getElementById("inputerrorMsge").innerHTML = ""; //clear error message
      //chatbox messages
      botMessage = "Thank you, bye!";
      // add messages to Chatlog
      messages.push("<b>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;" + 'You' + ":</b> " + lastUserMessage);
      messages.push("<b>" + botName + ":</b> " + botMessage);

      return;
    }
  }

  if (messages.length.toString() == '11') {

    if (lastUserMessage.toUpperCase(lastUserMessage) != "DONE") {
      //error message
      userErrormsg = "Letter only";
      document.getElementById("inputerrorMsge").innerHTML = userErrormsg;

      return;
    } else {
      document.getElementById("inputerrorMsge").innerHTML = ""; //clear error message
      //chatbox messages
      botMessage = "Thank you, bye!";
      //Chatlog messages
      messages.push("<b>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;" + 'You' + ":</b> " + lastUserMessage);
      messages.push("<b>" + botName + ":</b> " + botMessage);

      //After user type in DONE
      sendStatement(vUsername, "http://adlnet.gov/expapi/verbs/completed", "completed", "http://adlnet.gov/expapi/activities/completed", "Chatbot", "Chatbot completion");

      return;
    }
  }
}

//letters or emaial validation
function letterAndemail(letterfiler, errormsg, botMsg, lastMsg) {

  //letters only
  if (!letterfiler.test(lastMsg)) {
    //error message
    //userErrormsg = Errmsg;
    userErrormsg = errormsg;
    document.getElementById("inputerrorMsge").innerHTML = lastUserMessage + userErrormsg;
    return;
  } else {
    //clear error message
    document.getElementById("inputerrorMsge").innerHTML = "";

    vUsername = lastUserMessage.substring(0, 50);
    //chatbox messages
    botMessage = botMsg;
    //Chatlog messages
    messages.push("&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <b>" + 'You' + ":</b> " + vUsername);
    messages.push("<b>" + botName + ":</b> " + botMessage);
    return;
  }
}

//numbers only
function options(numberFiler, errMsg, botmsg, number) {

  //validate input number only
  if (!numberFiler.test(lastUserMessage) || lastUserMessage > number) {

    userErrormsg = errMsg;
    document.getElementById("inputerrorMsge").innerHTML = userErrormsg;
    return;

  } else {
    //clear error message
    document.getElementById("inputerrorMsge").innerHTML = "";
    botMessage = botmsg;

    //Chatlog messages
    messages.push("&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <b>" + 'You' + ":</b> " + lastUserMessage); //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    return;
  }
}

//****************************************************************
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //validate user inputs
    chatbotResponse();
    //set focus on the chatbox
    document.getElementById("chatbox").focus();
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 14; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }

    if( messages.length < 4){
      var urlValue = document.getElementById("chatborder");
        urlValue.setAttribute('style', "overflow-y: hidden;");

  } else {

      var urlValue1 = document.getElementById("chatborder");
      urlValue1.setAttribute('style', "overflow-y: scroll;");
   }

    //set the scrolling bar statying botton
    var chatHistorybar = document.getElementById("chatborder");
    chatHistorybar.scrollTop = chatHistorybar.scrollHeight;
  }
}

//runs the keypress() function when enter key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }

  if (key == 38) {
    console.log('hi')
    //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}
