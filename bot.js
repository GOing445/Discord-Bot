const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require("fs");
var request = require("request");
var xml2js = require("xml2js");

var adminfile = __dirname +"/data/admin.txt";
var kinggodfile = __dirname +"/data/kinggod.txt";
var adminarr;
var prepixArr;


var junchi = false;
var isSunbi = false;

/*fs.readFile(__dirname +"/../data/post.json",'utf8',function(err,data){
            var player = JSON.parse(data);
            len = Object.keys(posts).length;
            var postname = new Array();
            console.log(posts[0]["title"]);
            for(var i = 0;i<len;i++) postname.push(posts[i]["title"]);

            console.log(len);
});*/

function adminUpdate(){
    fs.readFile(adminfile, 'utf8', function(err, data) {
        adminarr = data.split("\n");  
    });
}
function adminSave(){
    fs.writeFile(adminfile, 'utf8', function(err,data){
        var temp;
        for(var i=0;i<adminarr.length;i++){

        }
    });
}
function kinggodUpdate(){
    fs.readFile(kinggodfile, 'utf8', function(err, data) {
        prepixArr = data.split("\n");
        console.log(prepixArr);
    });
}

function commandIs(str, msg){
    return msg.content.startsWith("!n." + str);
}

function isAdmin(userid){
    for(var i=0;i<adminarr.length;i++){
        if(userid*1 == adminarr[i]*1) return true;
    }
    return false;
}
function userFind(usernic,message){
    var memberArr = message.channel.members.array()
    for(var i=0;i<memberArr.length;i++){
        if(memberArr[i].user.username.indexOf(usernic)!=-1){
            return memberArr[i];
        }
    }
    return false;    
}
function RollCommandParser( str , mode ){
  var reg = /\+|\-|\*|\//g;
  str = str.replace(/ /gi, '');
  
  var strArr = str.split(reg);
  var strMatchArr = str.match(reg);
  
  var out = "";
  var temp = 0;
  for ( i = 0; i < strArr.length; i++ )
  {
    var str = strArr[i];
    var value;// = ( str.match("d") == null ) ? Number( str ) : DiceParser( str );
    var ovalue = "";
    
    if ( str.match("d") == null ){
      value = Number( str );
      ovalue = ovalue + value;
    } else {
      var diceArr = str.split("d");
      var diceType = diceArr[1];
      var num = diceArr[0];
      
      ovalue = ovalue + "(";
      value = 0;
      for (k = 0; k < num; k++)
      {
        var rnum = Math.floor((Math.random() * diceType) + 1);
        value = value + rnum
        if(k==0)
          ovalue = ovalue + rnum;
        else
          ovalue = ovalue + "+" + rnum;
      }
      ovalue = ovalue + ")";
    }
    if (i == 0){
      temp = value;
      out = ovalue;
    }else {
      var match = strMatchArr[i-1];
      
      if (match == "+" ) {
        temp = temp + value;
        out = out + "+" + ovalue;
      } else if (match == "-") {
        temp = temp - value;
        out = out + "-" + ovalue;
      } else if (match == "*") {
        temp = temp * value;
        out = out + "*" + ovalue;
      } else if (match == "/") {
        temp = temp / value;
        out = out + "/" + ovalue;
      }
    }
  }
  
  out = out + "= " + temp;
  
  if( mode == 0 ) return out;
  else if( mode == 1 ) return temp;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+'시간'+minutes+'분'+seconds+'초';
    return time;
}

client.on('ready', () => {
    console.log("bot is Online!");
    adminUpdate();
    kinggodUpdate();
    //client.channels.send("https://cdn.discordapp.com/attachments/286179759862317057/393386717849190408/Screenshot_20171221-214210.png");
    //message.sendMessage("https://cdn.discordapp.com/attachments/286179759862317057/393386717849190408/Screenshot_20171221-214210.png");
    fs.exists(__dirname +"/data/admin.txt", function (exists) { console.log("admin.txt is "+(exists ? "loaded." : "not loaded!")); });
});

client.on('message', message => {
    var data = new String();
    var date = new Date();
    data = message.content.toString();
    //var logContent = message.content.toString().replace();
    var dateString = "[" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]";

    console.log(dateString + message.author.username + " : " + message.content);


    if(message.content.indexOf("노")!=-1 && message.author != client.user && isSunbi == true &&  message.author.bot === false){
        var wordArr = message.content.toString().split(" ");
        for(var i=0;i<wordArr.length;i++){
            if(wordArr[i].indexOf("노")!=-1){
                message.reply("\""+wordArr[i]+"\"에서 노 빼주세요 ㅎ");
                message.channel.send("http://i.imgur.com/bNxiVaJ.png");
                break;
            }
        }
    }
    if(data.startsWith("!n.")){
        if(message.author.bot === false){
            if(commandIs("help",message)){
                message.channel.sendMessage("귀찮아서 help안만듬 Testing");
            }
            else if(commandIs("fuckyou",message)){
                message.reply("Fuck You to Mr." + message.author.username);
            }
            else if(commandIs("sex",message)){
                message.reply("\n:grin:\n:point_right: :ok_hand:");
            }
            else if(commandIs("정치",message)){
                if(junchi == false){
                    message.reply("정치질을 시작합니다.");
                    junchi = true;
                }else{
                    message.reply("정치질을 그만둡니다.");
                    junchi = false; 
                }
            }
            else if(commandIs("선비",message)){
                if(isSunbi == false){
                    message.reply("Seonbimode Activate");
                    isSunbi = true;
                }else{
                    message.reply("Seonbimode DeActivate");
                    isSunbi = false; 
                }
            }
            else if(commandIs("소라고둥",message)){
                var questionArr = message.content.toString().split(" "); 
                var answerArr = new Array("아니","아마도","그래","그런듯","가끔씩은..?","용앗","개소리하지마","(한숨)","아틸빠따죠 쒸바");
                if(questionArr.length>=2){
                    message.reply(answerArr[Math.floor(Math.random()*answerArr.length)]);
                }
                else{
                    message.reply("질문이 없으면 대답해줄수 없어.");
                }
            }
            else if(commandIs("사상검증",message)){
                var questionArr = message.content.toString().split(" "); 
                var answerArr = new Array("암크","빨갱이","스파이","트루 샨샤 노예");
                if(questionArr.length>=2){
                    message.reply(answerArr[Math.floor(Math.random()*answerArr.length)]);
                }
                else{
                    message.reply("질문이 없으면 대답해줄수 없어.");
                }
            }
            else if(commandIs("킹갓",message)){   
                
                var argsArr = new Array; 
                argsArr = message.content.toString().split(" ");
                var Output = "The ";

                if(argsArr.length<3){
                    message.reply("주어나 레벨이(혹은 둘다) 없습니다. !n.킹갓 [이름] [위대함(숫자)]");
                }
                else if(parseInt(argsArr[2])>prepixArr.length){
                    message.reply("대상의 위대함이 프로그램이 감당할수있는 수준을 넘어섰습니다! " + prepixArr.length +"이하로 지정해주세요!");
                }
                else{
                    for(var i=0;i<prepixArr.length;i++){
                        var temp;
                        var tempIndex = Math.floor(Math.random() * prepixArr.length);
                        temp = prepixArr[i];
                        prepixArr[i] = prepixArr[tempIndex];
                        prepixArr[tempIndex] = temp;
                    }
                    for(var i=0;i<parseInt(argsArr[2]);i++){
                        Output += prepixArr[i];
                    }
                    Output += argsArr[1];
                    message.reply(Output);
                }
            }
            else if(commandIs("uptime",message)){
                var time = process.uptime();
                var uptime = (time + "").toHHMMSS();
                message.reply("서버가 켜진지 "+uptime+" 지났습니다.");
            }
            else if(commandIs("id",message)){
                message.reply(message.author.id);
                console.log(message.author);
            }
            else if(commandIs("user",message)){
                //message.reply(isAdmin(message.author.id));

                var argsArr = new Array; 
                argsArr = message.content.toString().split(" ");
                
                var arrayt = message.channel.members.array()
                //for(var i=0;i<arrayt.length;i++) console.log("["+i+"] "+arrayt[i].user.username+":"+typeof(arrayt[i]));
                if(userFind(argsArr[1],message)!=false){
                    var find = userFind(argsArr[1],message);
                    message.reply("\nName : "+find.user.username+"\nid : "+find.user.id+"\n"+find.user.username+" is " + (isAdmin(find.user.id)?"admin":"not admin"));
                }
                else{
                    message.reply("해당유저를 찾을수 없었습니다.")
                }
            }
            else if(commandIs("giveadmin",message)){
                var argsArr = new Array; 
                argsArr = message.content.toString().split(" ");
                
                var arrayt = message.channel.members.array()
                //for(var i=0;i<arrayt.length;i++) console.log("["+i+"] "+arrayt[i].user.username+":"+typeof(arrayt[i]));
                if(isAdmin(message.author.id)){
                    if(userFind(argsArr[1],message)!=false){
                        var find = userFind(argsArr[1],message);
                        message.reply(find.user.username+" is now admin");
                    }
                    else{
                        message.reply("해당유저를 찾을수 없었습니다.")
                    }
                }
            }
            else if(commandIs("list",message)){
                var Output = "\n";
                var memberArr = message.channel.members.array();
                console.log(memberArr.length);
                for(var i=0;i<memberArr.length;i++){
                    Output+="["+(i+1)+"]"+memberArr[i].user.username+" : "+memberArr[i].user.id+"\n";
                }
                message.reply(Output);
            }
            else if (commandIs("state", message)) {
                console.log(message.channel);
                message.reply("\n"+message.channel.name+"\n"+message.channel.guild.name);
            }
            else if (commandIs("roll",message)){
                var argsArr = new Array; 
                argsArr = message.content.toString().split(" ");

                message.reply(RollCommandParser(argsArr[1],0));
            }
            else if (commandIs("xml",message)){
                var uri = "https://api.eveonline.com/server/ServerStatus.xml.aspx";
                var parser = new xml2js.Parser();

                request({
                    uri: "https://api.eveonline.com/server/ServerStatus.xml.aspx",
                    method: "GET",
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10
                    },
                    function(error, response, body) {
                        console.log(body);
                        parser.parseString(body, function(err, result){
                            var data = result.eveapi.result;
                            console.log(data[0]);
                            var test = {asdf : "asdf",qwer:"qwer"};
                            console.log(test);
                            message.reply('\nserver online? : ' + data[0].serverOpen+"\nplayers : "+ data[0].onlinePlayers);
                        });
                    }
                );
                
            }
            else if(commandIs("esi",message)){
                var url = "https://esi.tech.ccp.is/latest/status/";
                request({
                    uri: url,
                    method: "GET",
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10
                    },
                    function(error, response, body) {
                        console.log(body);
                        var data = JSON.parse(body);
                        console.log(data);

                        message.reply('\nserver online? : ' + (data.start_time!=null ? "True" : "False") + "\nplayers : " + data.players);
                    }
                );
            }
            else if(commandIs("lock",message)){
                var argsArr = new Array; 
                argsArr = message.content.toString().split(" ");

                message.reply("Lock Time : "+ (40000/argsArr[1]) / (Math.asinh(argsArr[2])**2) );
            }
            else{
                message.reply("없는 명령어입니다.");
            }
        }
    }
    else if(message.author.bot === true && message.author != client.user && junchi == true){
        message.reply("Shut up " + message.author.username);
    }
});

client.login('Mzc2MDQ2NTI1NzAyMzQwNjA4.DN4srQ.FDU15j3Nr2tLWKLiX5tuHfnxxlY');