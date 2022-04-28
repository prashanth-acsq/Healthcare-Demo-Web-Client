main = () => {
    let precision = 5

    let age = document.querySelector("#age")
    let gender = document.querySelector("#gender")
    let total_billrubin = document.querySelector("#total_billrubin")
    let direct_billrubin = document.querySelector("#direct_billrubin")
    let alkphos_alkaline_phosphotase = document.querySelector("#alkphos_alkaline_phosphotase")
    let sgpt_alamine_aminotransferase = document.querySelector("#sgpt_alamine_aminotransferase")
    let sgot_aspartate_aminotransferase = document.querySelector("#sgot_aspartate_aminotransferase")
    let total_protiens = document.querySelector("#total_protiens")
    let alb_albumin = document.querySelector("#alb_albumin")
    let ag_ratio = document.querySelector("#ag_ratio")

    let predict = document.querySelector("#predict")
    let reset = document.querySelector("#reset")
    let output = document.querySelector("#output")

    predict.addEventListener("click", () => {
        if (gender.value === "" || total_billrubin.value === "" || direct_billrubin.value === "" || alkphos_alkaline_phosphotase.value === "" || sgpt_alamine_aminotransferase.value === "" || sgot_aspartate_aminotransferase.value === "" || total_protiens.value === "" || age.value === ""){
            alert("Please Fill All Fields")
        }
        else
        {
            if (
                Number(total_billrubin.value) <  0 || 
                Number(direct_billrubin.value) < 0 || 
                Number(alkphos_alkaline_phosphotase.value < 0) || 
                Number(sgpt_alamine_aminotransferase.value < 0) || 
                Number(sgot_aspartate_aminotransferase.value < 0) || 
                Number(total_protiens.value < 0) || 
                Number(alb_albumin.value < 0) ||
                Number(ag_ratio.value < 0) ||  
                Number(age.value < 1) || 
                Number(age.value > 100)){
                    alert("Invalid Values")
            }
            else
            {
                if (gender.value === "Male" || gender.value == "M"){
                    gender.value = 1
                }
                else if (gender.value === "Female" || gender.value == "F"){
                    gender.value = 0
                }
                
                let data = {
                    web_client_data : JSON.stringify({
                        gender : gender.value,
                        total_billrubin : total_billrubin.value,
                        direct_billrubin : direct_billrubin.value,
                        alkphos_alkaline_phosphotase : alkphos_alkaline_phosphotase.value,
                        sgpt_alamine_aminotransferase : sgpt_alamine_aminotransferase.value,
                        sgot_aspartate_aminotransferase : sgot_aspartate_aminotransferase.value,
                        total_protiens : total_protiens.value,
                        alb_albumin : alb_albumin.value,
                        ag_ratio : ag_ratio.value,
                        age : age.value,
                    })
                }

                $.ajax({
                    type : "POST",
                    url : "http://127.0.0.1:10000/liver-disease-infer/",
                    data : data,
                    success : (response) => {
                        console.log(" ---------- ")
                        console.log(`Success, ${response["statusText"]}, ${response["statusCode"]}`)
                        console.log(" ---------- ")

                        output.value = (Number(response["probability"]) * 100).toPrecision(precision).toString() + " %"
                    },
                    error : (response) => {
                        console.log(" ---------- ")
                        console.log(`Failure, ${response["statusText"]}, ${response["statusCode"]}`)
                    },
                })
            }
        }
    })

    reset.addEventListener("click", () => {
        gender.value = ""
        total_billrubin.value = ""
        direct_billrubin.value = ""
        alkphos_alkaline_phosphotase.value = ""
        sgpt_alamine_aminotransferase.value = ""
        sgot_aspartate_aminotransferase.value = ""
        total_protiens.value = ""
        age.value = ""
        output.value = ""
    })
}

main()