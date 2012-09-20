
var USER_ID = '106825171914368756519';
var API_KEY = 'AIzaSyCJU1qbrA9tWSkEIVBmzTKxvgo29ZwzirM';
var MAX_REQUEST_NUM = 100;

var doc = SpreadsheetApp.getActiveSpreadsheet();
var queryParams = {
  maxResults: 20,
  orderBy: "recent",
  fields: "items(actor(displayName%2Cid)%2Cobject(attachments%2FfullImage%2Furl%2Ccontent%2Cplusoners%2Creplies%2Cresharers)%2Cpublished%2Ctitle%2Curl%2Cverb)%2CnextPageToken",
  key: API_KEY
}

//var gplusActivitiesSearchUrl = 'https://www.googleapis.com/plus/v1/activities?query=' + query + '&maxResults=' + maxResult + '&orderBy=' + orderBy +  '&key=' + API_KEY;
// https://www.googleapis.com/plus/v1/activities?query=%23geeklatte&maxResults=20&orderBy=recent&key=AIzaSyCJU1qbrA9tWSkEIVBmzTKxvgo29ZwzirM

//var fields = {'in_reply_to_screen_name': true,'created_at': true,'text': true};


function main() {
  var hash = 'geeklatte';
  var pageToken = undefined;
  var lastRow = 1;
  for (var i = 0; i < MAX_REQUEST_NUM; i++) {
    if (!pageToken && i) {
      fetchActivityListByHash(hash, lastRow, pageToken);
    }
  }
}

function buildGplusActivitiesSearchUrl(params){
  var baseUrl = 'https://www.googleapis.com/plus/v1/activities?';
  var paramStrs = [];
  for (var key in params){
    if (params[key] != undefined) {
      paramStrs.push(key + '=' + params[key]);
    }
  }
  return baseUrl + paramStrs.join('&');
}

function setData(cell, fields, colOffset){
  var rowOffset = 0;
  for (var i = 0; i < fields.length; i++) {
    cell.offset(rowOffset, colOffset).setValue(fields[i]);
    rowOffset++;
  }
}

function fetchActivityListByHash (hash, lastRow, pageToken) {
  hash = '%23' + hash;
  queryParams.query = hash;
  queryParams.pageToken = pageToken;
  var gplusActivitiesSearchUrl = buildGplusActivitiesSearchUrl(queryParams);
  var response = UrlFetchApp.fetch(gplusActivitiesSearchUrl);
//  var results = null;
//  if (response.getResponseCode() == 200) {
//    var data = Utilities.jsonParse(response.getContentText());
//    results = data["results"];
//  }
// return results;
  var returnedJson  = Utilities.jsonParse(response.getContentText());
  pageToken = returnedJson.nextPageToken;
  var posts = returnedJson.items;
  var content = new Array();
  var published = new Array();
  var url = new Array();
  var actorId = new Array();
  var actorDisplayName = new Array();
  var title = new Array();
  var fullImageURL0 = new Array();
  

  for (var i = 0, l = posts.length; i < l; i++) {
    var thisPost = posts[i];
    if (thisPost.actor.id === USER_ID && thisPost.verb === "post") {
      content[i] = thisPost.object.content;
      published[i] = thisPost.published;
      url[i] = thisPost.url;
      actorDisplayName[i] = thisPost.actor.displayName;
      title[i] = thisPost.title;
      //    if (thisPost.object.attachments && thisPost.object.attachments.length >= 1)  attachment があるかどうかを判定   
      if (thisPost.object.attachments[0].fullImage) {
        fullImageURL0[i] = thisPost.object.attachments[0].fullImage.url;
      } else {
        fullImageURL0[i] = " ";
      }
    }
  }

  var range = doc.getRange('a' + lastRow);
  var setData_ = function(field, colOffset) {
    setData(range, field, colOffset)
  }
  
  setData_(published, 0);
  setData_(title, 1);
  setData_(content, 2);
  setData_(actorDisplayName, 3);
  setData_(url, 4);
  setData_(fullImageURL0, 5);
  setData_(actorId, 6);
  
  lastRow++;
}

function _fetchActivityListByHash(){
  return;
}
  

