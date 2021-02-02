/*
* Key
* <pr> = pronoun [you, it, they]
* <is> = to be, conjugate to match pronoun [is, are, can be]
* <asp> = sign aspect
* <adj> = adjective
* <adv> = adverb
* <mverb> = matches verb
*/
var fragments, structures, signs, adjectives, aspects, types, mverbs;

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

    httpGet("json/verbs.json", function(response){
        try {
            mverbs = JSON.parse(response)["mverbs"];
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

function matchParagrah(matches)
{
    let paragraph = "";
    for(let i = 0; i < 7; i++)
    {
        //1 or 2 sentence structure
        if(i % 2 == 0) paragraph += matchSentence(structures["matches"][0], matches);
        else paragraph += matchSentence(structures["matches"][1], matches);
    }
    return paragraph;
}

function matchSentence(sentence, matches)
{
    console.log(sentence);
    //Fill structure with sentence fragments
    sentence = replaceTagRandomly(sentence, "cause", fragments["matches"]["cause"]);
    sentence = replaceTagRandomly(sentence, "cause_sent", fragments["matches"]["cause_sent"]);
    sentence = replaceTagRandomly(sentence, "effect", fragments["matches"]["effect"]);
    sentence = replaceTagRandomly(sentence, "effect_sent", fragments["matches"]["effect_sent"]);

    //Fill out sentence
    sentence = matchSigns(sentence, matches);

    sentence = replaceTagRandomly(sentence, "adj", adjectives);
    sentence = replaceTagRandomly(sentence, "adv", adverbs);
    sentence = replaceTagRandomly(sentence, "mverb", verbs["mverbs"]);
    sentence = replaceTagRandomly(sentence, "asp", aspects);
    sentence = replaceTagRandomly(sentence, "type", types);

    return sentence;
}

//Replace all sign tags in a sentence from the provided list of matches (sign) alternating
function matchSigns(sentence, matches)
{
    //Start at a random sign
    let sign = Math.floor(Math.random() * matches.length);
    //Number each <sign> and <signpl> tag to track where each sign goes
    while(sentence.includes("<sign>" || "<signpl>"))
    {
        sentence = sentence.replace(/<sign|<signpl/, $& + sign);
        if(++sign >= matches.length) sign = 0;
    }
    //Replace each <sign> and <signpl> with one of the matches, alternating
    for(let i = 0; i < matches.length; i++)
    {
        let re = new RegExp("<sign" + i + ">", "g");
        sentence = sentence.replace(re, signs[matches[i]]["name"]);
        re = new RegExp("<signpl" + i + ">", "g");
        sentence = sentence.replace(re, signs[matches[i]]["plural"]);
    }
    return sentence;
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