main = () => {
    let precision = 5

    let age = document.querySelector("#age")
    let gender = document.querySelector("#gender")
    let height = document.querySelector("#height")
    let weight = document.querySelector("#weight")
    let ap_high = document.querySelector("#ap_high")
    let ap_low = document.querySelector("#ap_low")
    let cholestrol = document.querySelector("#cholestrol")
    let glucose = document.querySelector("#glucose")
    let smoke = document.querySelector("#smoke")
    let alcohol = document.querySelector("#alcohol")
    let active = document.querySelector("#active")

    let predict = document.querySelector("#predict")
    let reset = document.querySelector("#reset")
    let output = document.querySelector("#output")

    predict.addEventListener("click", () => {
        if (gender.value === "" || 
            height.value === "" || 
            weight.value === "" || 
            ap_high.value === "" || 
            ap_low.value === "" || 
            cholestrol.value === "" ||
            glucose.value === "" || 
            smoke.value === "" || 
            alcohol.value === "" || 
            age.value === "" ||
            active.value === ""){
            alert("Please Fill All Fields")
        }
        else
        {
            if (
                Number(height.value) <  0 || 
                Number(weight.value) < 0 || 
                Number(ap_high.value < 0) || 
                Number(ap_low.value < 0) || 
                Number(cholestrol.value < 0) || 
                Number(glucose.value < 0) || 
                Number(smoke.value < 0) ||
                Number(alcohol.value < 0) ||  
                Number(age.value < 1) || 
                Number(age.value > 100)){
                    alert("Invalid Values")
            }
            else
            {
                if (gender.value === "Male" || gender.value == "M"){
                    gender.value = 2
                }
                else if (gender.value === "Female" || gender.value == "F"){
                    gender.value = 1
                }
                
                let data = {
                    web_client_data : JSON.stringify({
                        age : age.value,
                        gender : gender.value,
                        height : height.value,
                        weight : weight.value,
                        ap_high : ap_high.value,
                        ap_low : ap_low.value,
                        cholestrol : cholestrol.value,
                        glucose : glucose.value,
                        smoke : smoke.value,
                        alcohol : alcohol.value,
                        active : active.value,
                    })
                }

                $.ajax({
                    type : "POST",
                    url : "http://127.0.0.1:10000/infer/cardiovascular-disease",
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
        age.value = ""
        gender.value = ""
        height.value = ""
        weight.value = ""
        ap_high.value = ""
        ap_low.value = ""
        cholestrol.value = ""
        glucose.value = ""
        smoke.value = ""
        alcohol.value = ""
        active.value = ""
    })
}

main()