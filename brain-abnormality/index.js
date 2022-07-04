main = () => {
    let image_input = document.querySelector("#image_input")

    let preview_canvas_1 = document.querySelector("#preview_canvas_1")
    let preview_ctx_1 = preview_canvas_1.getContext("2d")
    let preview_w_1 = preview_canvas_1.getAttribute("width")
    let preview_h_1 = preview_canvas_1.getAttribute("height")

    let preview_canvas_2 = document.querySelector("#preview_canvas_2")
    let preview_ctx_2 = preview_canvas_2.getContext("2d")
    let preview_w_2 = preview_canvas_2.getAttribute("width")
    let preview_h_2 = preview_canvas_2.getAttribute("height")

    let hidden_canvas = document.querySelector("#hidden_canvas")
    let hidden_ctx = hidden_canvas.getContext("2d")
    let hidden_canvas_data = null

    let preview_image_1 = new Image()
    let preview_image_2 = new Image()
    let hidden_image = new Image()

    let segment = document.querySelector("#segment")
    let reset = document.querySelector("#reset")

    image_input.addEventListener("change", (e1) => {
        if(e1.target.files){
            let imageFile = e1.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(imageFile)
            reader.onload = (e2) => {
                preview_image_1.src = e2.target.result
                hidden_image.src = e2.target.result

                hidden_image.onload = () => {
                    preview_ctx_1.drawImage(preview_image_1, 0, 0, preview_w_1, preview_h_2)

                    hidden_canvas.setAttribute("width", hidden_image.width)
                    hidden_canvas.setAttribute("height", hidden_image.height)
                    hidden_ctx.drawImage(hidden_image, 0, 0, hidden_canvas.width, hidden_canvas.height)
                    hidden_canvas_data = hidden_canvas.toDataURL()
                }
            }
        }
    })


    segment.addEventListener("click", () => {
        if (hidden_canvas_data === null){
            alert("Please Upload an Image First")
        }
        else{

            let data = JSON.stringify({
                imageData : hidden_canvas_data,
            })

            $.ajax({
                type : "POST",
                url : "http://127.0.0.1:10000/infer/brain-mri",
                data : data,
                contentType : "application/json",
                dataType : "json",
                success : (response) => {
                    console.log(" ---------- ")
                    console.log(`Success, ${response["statusText"]}, ${response["statusCode"]}`)
                    console.log(" ---------- ")                    

                    hidden_image.src = response["imageData"]
                    hidden_image.onload = () => {
                        preview_image_2.src = response["imageData"]
                        preview_ctx_2.drawImage(preview_image_2, 0, 0, preview_w_2, preview_h_2)
                        hidden_ctx.drawImage(hidden_image, 0, 0, hidden_canvas.width, hidden_canvas.height)
                    }
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
        preview_image_1.src = ""
        preview_image_2.src = ""
        hidden_image.src = ""
        preview_ctx_1.clearRect(0, 0, preview_w_1, preview_h_1)
        preview_ctx_2.clearRect(0, 0, preview_w_2, preview_h_2)
        image_input.value = ""
    })
}

main()