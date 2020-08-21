//
let snd=new Audio('click.wav');
$('#encrypting').hide();
$('#decrypting').hide();
$('#key').hide();
$('.button').hide();

$('#enc').click(function (e) { 
    e.preventDefault();
    $('#encrypting').show();
    $('#key').show();
    $('#decrypting').hide();
    $('.button').show();
    $('#btn').html('Click to encrypt');

});
$('#dec').click(function (e) { 
    e.preventDefault();
    $('#decrypting').show();
    $('#key').show();
    $('#encrypting').hide();
    $('.button').show();
    $('#btn').html('Click to decrypt');
});

$('#marshylogo').hover(function () {
        // over
        $('#marshylogo img').attr('src', 'GitHub-Mark-64px.png');
    }, function () {
        // out
        $('#marshylogo img').attr('src', 'GitHub-Mark-Light-64px.png');
    }
);
$('#rixlogo').hover(function () {
    // over
    $('#rixlogo img').attr('src', 'GitHub-Mark-64px.png');
}, function () {
    // out
    $('#rixlogo img').attr('src', 'GitHub-Mark-Light-64px.png');
}
);



//input values
let data={}
const encryptInput=document.querySelector('#encrypting>input');
const decryptInput=document.querySelector('#decrypting>input');
const keyInput=document.querySelector('#key>input');

const encryptInputField=document.getElementById('encrypting');
const decryptInputField=document.getElementById('decrypting');
const keyInputField=document.getElementById('key');
//buttons
const clikme=document.getElementById('btn');
const encryptBtn=document.getElementById('enc');
const decryptBtn=document.getElementById('dec');

encryptInput.disabled=true;
decryptInput.disabled=true;
keyInput.disabled=true;



//encrypting functions
function encrypter(txt, locations, key) {
    let i, j, a = {}, b = {}, encrypt = "";
    console.log("Text you entered: " + txt);

    txt = txt.toLowerCase().match(/.{1,2}/g);
    if (txt[txt.length - 1].length == 1) txt[txt.length - 1] += "x";

    for (i = 0; i < txt.length; i++) {
        a.l = txt[i][0]; b.l = txt[i][1];

        if (a.l === b.l) b.l = "x";
        a.loc = locations[a.l]; b.loc = locations[b.l];

        if (a.loc[0] == b.loc[0] && a.loc[1] == b.loc[1]) {
            encrypt += "xx";
        } else if (a.loc[0] == b.loc[0]) {

            if ((a.loc[1] + 1) == 7) { j = 0 } else { j = (a.loc[1] + 1) }
            encrypt += key[a.loc[0]][j];

            if ((b.loc[1] + 1) == 7) { j = 0 } else { j = (b.loc[1] + 1) }
            encrypt += key[b.loc[0]][j];

        } else if (a.loc[1] == b.loc[1]) {

            if ((a.loc[0] + 1) == 7) { j = 0 } else { j = (a.loc[0] + 1); }
            encrypt += key[j][a.loc[1]];

            if ((b.loc[0] + 1) == 7) { j = 0 } else { j = (b.loc[0] + 1); }
            encrypt += key[j][b.loc[1]];

        } else {
            encrypt += key[a.loc[0]][b.loc[1]];
            encrypt += key[b.loc[0]][a.loc[1]];
        }
    }
    encryptInput.value=encrypt;
    console.log("Encrypted Text: " + encrypt);
}


//Decrypting
function decrypter(txt, locations, key) {
    let i, j, a = {}, b = {}, decrypt = "";
    console.log("Text you entered: " + txt);

    txt = txt.toLowerCase().match(/.{1,2}/g);

    for (i = 0; i < txt.length; i++) {
        a.l = txt[i][0]; b.l = txt[i][1];
        a.loc = locations[a.l]; b.loc = locations[b.l];

        if (a.l == b.l) {
            decrypt += "xx";
        } else if (a.loc[0] == b.loc[0]) {

            if ((a.loc[1] - 1) == -1) { j = 6 } else { (j = a.loc[1] - 1) }
            decrypt += key[a.loc[0]][j];

            if ((b.loc[1] - 1) == -1) { j = 6 } else { (j = b.loc[1] - 1) }
            decrypt += key[b.loc[0]][j];

        } else if (a.loc[1] == b.loc[1]) {

            if ((a.loc[0] - 1) == -1) { j = 6 } else { (j = a.loc[0] - 1) }
            decrypt += key[j][a.loc[1]];

            if ((b.loc[0] - 1) == -1) { j = 6 } else { (j = b.loc[0] - 1) }
            decrypt += key[j][b.loc[1]];

        } else {
            decrypt += key[a.loc[0]][b.loc[1]];
            decrypt += key[b.loc[0]][a.loc[1]];
        }
    }
    if (decrypt[decrypt.length-1]==='x'){   
        decrypt=decrypt.split('');
        decrypt.splice(decrypt.length-1,1);
        decrypt=decrypt.join('')
    }
    decryptInput.value=decrypt;
    console.log("Decrypted Text: " + decrypt);
}




//running the operations
function run(){
    let temp = []; // Empty Array
    let i, j, k;
    
    data.key = data.key.toLowerCase();
    
    // Getting our Key
    data.key += "abcdefghijklmnopqrstuvwxyz1234567890.,!?@$%()/`# ";
    data.key = data.key.split('');
    
    data.key.forEach(function (elem) {
        if (!temp.includes(elem)) {
            temp.push(elem);
        }
    })
    
    // Setting up our 2 Dimentional Array [Matrix]
    
    let key = [];
    let location = {};
    for (i = 0; i < 7; i++) {
        key[i] = [];
    } // Array Initialization, won't work otherwise
    
    for (i = 0, k = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            key[i][j] = temp[k];
            location[temp[k++]] = [i, j];
        }
    }
    
    let choice = parseInt(data.to);

    
    switch (choice) {
        case 0: encrypter(data.encrypt, location, key); break;
        case 1: decrypter(data.decrypt, location, key); break;
        case 2: encrypter(data.encrypt, location, key);
                decrypter(data.decrypt, location, key);
                break;
        default: console.log("Invalid Choice");
    }
    
    if (data.matrix_visible) {
        console.log("7x7 Matrix: ");
        console.log(key);
    }
}
    

//inputing
function inputing()
{
    let enOrDe=-1;




    encryptBtn.addEventListener('click',()=>{
        snd.play();
        snd.currentTime=0;
        encryptInput.disabled=false;
        keyInput.disabled=false;
        decryptInput.disabled=true;
        enOrDe=0;
    })
    decryptBtn.addEventListener('click',()=>{
        snd.play();
        snd.currentTime=0;
        decryptInput.disabled=false;
        keyInput.disabled=false;
        encryptInput.disabled=true;
        enOrDe=1;
    })



    clikme.addEventListener('click',()=>{
        snd.play();
        snd.currentTime=0;
         data={
            "key": keyInput.value,
            "encrypt": encryptInput.value,
            "decrypt": decryptInput.value,
            "to": enOrDe,
            "matrix_visible": false
            }
            
            run();
    })
    
}
inputing();

