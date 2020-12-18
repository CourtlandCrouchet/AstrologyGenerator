/*
* Key
* <pr> = pronoun [you, it, they]
* <is> = to be, conjugate to match pronoun [is, are, can be]
* <asp> = sign aspect
* <adj> = adjective
*/
var fragments, structures, signs, aspects, types;

function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    callback(xmlHttp.responseText);
}

loadSentenceData()
{
    httpGet("json/sentence_fragments.json", function(response){
        try {
            fragments = JSON.parse(response);
        }
        catch(e)
        {
            console.log(e);
        }
    });

    httpGet("json/sentence_structures.json", function(response){
        try {
            structures = JSON.parse(response);
        }
        catch(e)
        {
            console.log(e);
        }
    });

    httpGet("json/sign_aspects.json", function(response){
        try {
            aspects = JSON.parse(response);
        }
        catch(e)
        {
            console.log(e);
        }
    });
    
    httpGet("json/sign_types.json", function(response){
        try {
            types = JSON.parse(response);
        }
        catch(e)
        {
            console.log(e);
        }
    });

    httpGet("json/signs.json", function(response){
        try {
            signs = JSON.parse(response);
        }
        catch(e)
        {
            console.log(e);
        }
    });
}

function matchSentence()
{

}
function signSentence()
{
    
}
function horoscopeSentence()
{

}

loadSentenceData();