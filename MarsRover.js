const { exit } = require('process')
const readline = require('readline')
  
const rl = readline.createInterface(process.stdin, process.stdout)

function getReadLine(message) {
    return new Promise((resolve) => {
        rl.question(message, result => {
            resolve(result)
        })
    })
}

async function appStart() {
    // konsoldan plato bilgileri alındı
    const response2 = await getReadLine('platonun kordinatı giriniz: ')
    const plateau =  response2.toString().trim().split(/\s+/);
    if(plateau.length === 2){
        const value1 = parseInt(plateau[0])
        const value2 = parseInt(plateau[1])
        if(value1 && value2){
            plateau[0] = value1
            plateau[1] = value2
        }else{
            console.log("hatalı plato kordinatı girişi yaptınız")
            exit()
        }
    }else {
        console.log("hatalı plato kordinatı girişi yaptınız")
        exit()
    }
    // konsoldan gezici bilgileri alındı
    const response1 = await getReadLine('gezici locationu giriniz: ')
    const location =  response1.toString().trim().split(/\s+/);
    if(location.length === 3){
        const value1 = parseInt(location[0])
        const value2 = parseInt(location[1])
        const value3 = location[2] == "n" || location[2] == "e" || location[2] == "w" || location[2] == "s"
        if(value1 && value2 && value3){
            location[0] = value1
            location[1] = value2
        }else{
            console.log("hatalı konum girişi yaptınız")
            exit()
        }
    }else {
        console.log("hatalı konum girişi yaptınız")
        exit()
    }
    // konsoldan gezicinin harket bilgileri alındı
    const response3 = await getReadLine('geziciyi yönlendiriniz(l,m,r) : ')
    const text = response3.toString().trim();
    for(let i = 0; i<text.length; i++){
        if(text[i] != "l" && text[i] != "r" && text[i] != "m"){
            console.log("hatalı hareket girdiniz.")
            exit()
        }
    }
    // gezicinin hangi yönde nasıl ilerlemesi gerektiğini belirten tanımlamalar yapıldı
    const n=[0,1];
    const e=[1,0];
    const s=[0,-1];
    const w=[-1,0];

    // gezicinin ekseni etrafında dönmesi için gereken işlemler yapıldı
    function rotateOperation(arr){
        const n=[0,1];
        const e=[1,0];
        const s=[0,-1];
        const w=[-1,0];
        let result = "";
        if(arr[0] == n[0] && arr[1] == n[1]){
            result = "n";
        }else if(arr[0] == e[0] && arr[1] == e[1]){
            result = "e";
        }else if(arr[0] == w[0] && arr[1] == w[1]){
            result = "w";
        }else if(arr[0] == s[0] && arr[1] == s[1]){
            result = "s";
        }
        return result
    }
    // girdilere göre yönlendirmeler yapıldı
    for(let i=0; i<text.length;i++){
        let newRt = [];
        if(text[i] == "l"){
            if(location[2] == "n"){
                newRt = [(-1)*(n[1]),(n[0])];
                location[2] = rotateOperation(newRt)
            }else if(location[2] == "e"){
                newRt = [(-1)*(e[1]),(e[0])];
                location[2] = rotateOperation(newRt)
            }else if(location[2] == "w"){
                newRt = [(-1)*(w[1]),(w[0])];
                location[2] = rotateOperation(newRt)
            }else if(location[2] == "s"){
                newRt = [(-1)*(s[1]),(s[0])];
                location[2] = rotateOperation(newRt)
            }
        }else if(text[i] == "r"){
            if(location[2] == "n"){
                newRt = [(n[1]),(-1)*(n[0])];
                location[2] = rotateOperation(newRt)
            }else if(location[2] == "e"){
                newRt = [(e[1]),(-1)*(e[0])];
                location[2] = rotateOperation(newRt)
            }else if(location[2] == "w"){
                newRt = [(w[1]),(-1)*(w[0])];
                location[2] = rotateOperation(newRt)
            }else if(location[2] == "s"){
                newRt = [(s[1]),(-1)*(s[0])];
                location[2] = rotateOperation(newRt)
            }
        }else if(text[i] == "m"){// gezicinin ilerlemesi için gerekli olan işlemler yapıldı
            if(location[2] == "n"){
                if(location[0] + n[0] > plateau[0] || location[0] + n[0] < 0){
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + " Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[0] = location[0] + n[0]; 
                if(location[1] + n[1] > plateau[1] || location[1] + n[1] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[1] = location[1] + n[1]; 
            }else if(location[2] == "e"){ 
                if(location[0] + e[0] > plateau[0] || location[0] + e[0] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[0] = location[0] + e[0]; 
                if(location[1] + e[1] > plateau[1] || location[1] + e[1] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[1] = location[1] + e[1]; 
            }else if(location[2] == "w"){ 
                if(location[0] + w[0] > plateau[0] || location[0] + w[0] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[0] = location[0] + w[0]; 
                if(location[1] + w[1] > plateau[1] || location[1] + w[1] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[1] = location[1] + w[1]; 
            }else if(location[2] == "s"){ 
                if(location[0] + s[0] > plateau[0] || location[0] + s[0] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit() 
                }else 
                    location[0] = location[0] + s[0]; 
                if(location[1] + s[1] > plateau[1] || location[1] + s[1] < 0){ 
                    console.log("Plato dışarısına çıktınız ve geziciniz uzayda kayboldu. Son görülen konum: (" + location[0] , location[1] , location[2] + ") Lütfen evreni korumak için uzay çöpleri konusunda daha dikkatli olalım")
                    exit()
                }else
                    location[1] = location[1] + s[1];
            }
        }
    }
    console.log(location[0],location[1],location[2]),
    exit()
}

appStart()