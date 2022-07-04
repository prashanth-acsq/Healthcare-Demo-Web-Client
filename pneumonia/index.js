main = () => {
    let precision = 5

    let image_input = document.querySelector("#image_input")

    let preview_canvas = document.querySelector("#preview_canvas")
    let preview_ctx = preview_canvas.getContext("2d")
    let preview_w = preview_canvas.getAttribute("width")
    let preview_h = preview_canvas.getAttribute("height")

    let hidden_canvas = document.querySelector("#hidden_canvas")
    let hidden_ctx = hidden_canvas.getContext("2d")
    let hidden_canvas_data = null

    let preview_image = new Image()
    let hidden_image = new Image()

    let predict = document.querySelector("#predict")
    let reset = document.querySelector("#reset")

    let output = document.querySelector("#output")

    image_input.addEventListener("change", (e1) => {
        if(e1.target.files){
            let imageFile = e1.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(imageFile)
            reader.onload = (e2) => {
                preview_image.src = e2.target.result
                hidden_image.src = e2.target.result

                hidden_image.onload = () => {
                    preview_ctx.drawImage(preview_image, 0, 0, preview_w, preview_h)

                    hidden_canvas.setAttribute("width", hidden_image.width)
                    hidden_canvas.setAttribute("height", hidden_image.height)
                    hidden_ctx.drawImage(hidden_image, 0, 0, hidden_canvas.width, hidden_canvas.height)
                    hidden_canvas_data = hidden_canvas.toDataURL()
                }
            }
        }
    })

    predict.addEventListener("click", () => {
        if (hidden_canvas_data === null){
            alert("Please Upload an Image First")
        }
        else{

            let data = {
                data : JSON.stringify({
                    imageData : hidden_canvas_data,
                }),
            }

            $.ajax({
                type : "POST",
                url : "http://127.0.0.1:10000/infer/pneumonia",
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
                    console.log(" ---------- ")
                },
            })
        }
    })

    reset.addEventListener("click", () => {
        hidden_canvas_data = null
        preview_image.src = ""
        hidden_image.src = ""
        preview_ctx.clearRect(0, 0, preview_w, preview_h)
        image_input.value = ""
        output.value = ""
    })

}

main()