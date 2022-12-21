
    console.log("ok")
    const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector("#clear-canvas"),
    saveImg = document.querySelector("#save-img"),
    ctx = canvas.getContext("2d");

    let prevMouseX, prevMouseY, snapshot;
    let isDrawing = false;
    let brushWidth = 5;
    let selectedTool = "brush";
    let selectedColor = "#000"

    const setCanvasBackground = () => {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = selectedColor;

    }

    window.addEventListener("load", () => {
        canvas.width = canvas.offsetWidth;//retour la parti visible de l'element a l'échelle
        canvas.height = canvas.offsetHeight;
    });

    const drawRect = (e) => {
        if(!fillColor.checked){
            return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
        }
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    const drawCircle = (e) => {
        ctx.beginPath();
        let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2 ) + Math.pow((prevMouseY - e.offsetY), 2));
        ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
        fillColor.checked ? ctx.fill() : ctx.stroke();
    }
    const drawTriangle = (e) => {
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY); //donne la direction du triangle
        ctx.lineTo(e.offsetX, e.offsetY); //crée le premier point sur le curseur au clic
        ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
        ctx.closePath(); // permet de tracer la derniere ligne seule
        ctx.stroke();
        fillColor.checked ? ctx.fill() : ctx.stroke();
    }



    const startDraw = (e) => {
        isDrawing = true;
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        ctx.beginPath();//crée un nouveau point de départ
        ctx.lineWidth = brushWidth;
        ctx.strokeStyle = selectedColor;
        ctx.fillStyle = selectedColor;
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)

    }
    const drawing = (e) => {
        if(!isDrawing)return;
        ctx.putImageData(snapshot, 0, 0,);

        if(selectedTool === "brush" || selectedTool ==="eraser"){
            ctx.strokeStyle = selectedTool ==="eraser" ? "#fff" : selectedColor
            ctx.lineTo(e.offsetX, e.offsetY); //crée une ligne sur le pointeur
            ctx.stroke(); //dessine
        }else if (selectedTool === "rectangle"){
            drawRect(e);
        }else if (selectedTool ==="circle"){
            drawCircle(e);
        }
        else{
            drawTriangle(e);
        }
    }
    toolBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            //retire active du bouton selectionner et s'active sur l'autre element choisi
            document.querySelector(".options .active").classList.remove("active");
            btn.classList.add("active")     
            selectedTool = btn.id;
            console.log(btn.id)
        })
    });
    sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value)

    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".selected").classList.remove("selected");
            btn.classList.add("selected")
            selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
        });
    });

    colorPicker.addEventListener("change", () => {
        colorPicker.parentElement.style.background = colorPicker.value;
        colorPicker.parentElement.click();
    })

    clearCanvas.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setCanvasBackground();
    });

    saveImg.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = `${Date.now()}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
    });

    canvas.addEventListener("mousedown", startDraw);
    /*canvas.addEventListener("mouseout", () => isDrawing = false);*/
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => isDrawing = false);
