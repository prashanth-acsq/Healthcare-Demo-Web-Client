main = () => {
    let precision = 5

    let pregnancies = document.querySelector("#pregnancies")
    let plasma_glucose = document.querySelector("#plasma_glucose")
    let diastolic_blood_pressure = document.querySelector("#diastolic_blood_pressure")
    let triceps_thickness = document.querySelector("#triceps_thickness")
    let serum_insulin = document.querySelector("#serum_insulin")
    let bmi = document.querySelector("#bmi")
    let diabetes_pedigree = document.querySelector("#diabetes_pedigree")
    let age = document.querySelector("#age")

    let predict = document.querySelector("#predict")
    let reset = document.querySelector("#reset")
    let output = document.querySelector("#output")

    predict.addEventListener("click", () => {
        if (pregnancies.value === "" || plasma_glucose.value === "" || diastolic_blood_pressure.value === "" || triceps_thickness.value === "" || serum_insulin.value === "" || bmi.value === "" || diabetes_pedigree.value === "" || age.value === ""){
            alert("Please Fill All Fields")
        }
        else
        {
            if (Number(pregnancies.value) < 0 || 
                Number(pregnancies.value) > 15 || 
                Number(plasma_glucose.value) <  0 || 
                Number(diastolic_blood_pressure.value) < 0 || 
                Number(triceps_thickness.value < 0) || 
                Number(serum_insulin.value < 0) || 
                Number(bmi.value < 0) || 
                Number(diabetes_pedigree.value < 0) || 
                Number(age.value < 1) || 
                Number(age.value > 100)){
                    alert("Invalid Values")
            }
            else
            {
                let data = {
                    web_client_data : JSON.stringify({
                        pregnancies : pregnancies.value,
                        plasma_glucose : plasma_glucose.value,
                        diastolic_blood_pressure : diastolic_blood_pressure.value,
                        triceps_thickness : triceps_thickness.value,
                        serum_insulin : serum_insulin.value,
                        bmi : bmi.value,
                        diabetes_pedigree : diabetes_pedigree.value,
                        age : age.value,
                    })
                }

                $.ajax({
                    type : "POST",
                    url : "http://127.0.0.1:10000/diabetes-infer/",
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
                        alert("No Models Found; please train by going to http://localhost:10000/diabetes-train/")
                        console.log(" ---------- ")
                    },
                })
            }
        }
    })

    reset.addEventListener("click", () => {
        pregnancies.value = ""
        plasma_glucose.value = ""
        diastolic_blood_pressure.value = ""
        triceps_thickness.value = ""
        serum_insulin.value = ""
        bmi.value = ""
        diabetes_pedigree.value = ""
        age.value = ""
        output.value = ""
    })
}

main()