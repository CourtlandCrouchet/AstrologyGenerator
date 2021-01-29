/*
* Key
* <pr> = pronoun [you, it, they]
* <is> = to be, conjugate to match pronoun [is, are, can be]
* <asp> = sign aspect
* <adj> = adjective
* <adv> = adverb
* <mverb> = matches verb
*/
var fragments, structures, signs, adjectives, aspects, types;

function httpGet(path, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                callback(xhr.response);
            }
            else {
                console.log("error");
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function loadSentenceData()
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

    httpGet("json/sign_adjectives.json", function(response){
        try {
            adjectives = JSON.parse(response)["adjectives"];
        }
        catch(e)
        {
            console.log(e);
        }
    });
    
    httpGet("json/sign_aspects.json", function(response){
        try {
            response = JSON.parse(response);
            aspects = response["aspect"];
            types = response["type"];
        }
        catch(e)
        {
            console.log(e);
        }
    });

    httpGet("json/signs.json", function(response){
        try {
            signs = JSON.parse(response)["signs"];
        }
        catch(e)
        {
            console.log(e);
        }
    });
}

//Get a random element from an array
function getRand(arr)
{
    return arr[Math.floor(Math.random() * Math.floor(arr.length))];
}

//Replace all instances of a given tag with a random element from the provided vals array
function replaceTagRandomly(sentence, tag, vals)
{
    //Replace each tag instance
    while(sentence.includes("<" + tag + ">"))
        sentence = sentence.replace("<" + tag + ">", getRand(vals));
    return sentence;
}

function matchSentence()
{

}
function signParagraph(sign)
{
    let paragraph = "";
    for(let i = 0; i < 7; i++)
    {
        //1 or 2 sentence structure
        if(i % 2 == 0) paragraph += signSentence(structures["signs"][0], sign);
        else paragraph += signSentence(structures["signs"][1], sign);
    }
    return paragraph;
}
function signSentence(sentence, sign)
{
    console.log(sentence);
    //Fill structure with sentence fragments
    sentence = replaceTagRandomly(sentence, "cause", fragments["signs"]["cause"]);
    sentence = replaceTagRandomly(sentence, "cause_sent", fragments["signs"]["cause_sent"]);
    sentence = replaceTagRandomly(sentence, "effect", fragments["signs"]["effect"]);
    sentence = replaceTagRandomly(sentence, "effect_sent", fragments["signs"]["effect_sent"]);

    //Fill out sentence
    sentence = sentence.replace(/<sign>/g, signs[sign]["name"]);
    sentence = sentence.replace(/<signpl>/g, signs[sign]["plural"]);

    sentence = replaceTagRandomly(sentence, "adj", adjectives);
    sentence = replaceTagRandomly(sentence, "asp", aspects);
    sentence = replaceTagRandomly(sentence, "type", types);

    return sentence;
}
function horoscopeSentence()
{

}

loadSentenceData();