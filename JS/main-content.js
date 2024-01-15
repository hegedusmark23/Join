
function generateSummaryContent(){              
    let container = document.getElementById('main-content');

    container.innerHTML = summaryHTML();
}

function changePencilImgColor(){                //Changes the color of an icon on hover
    var image = document.getElementById("pencil-icon");
    var button = document.getElementById("pencil-button");
    button.addEventListener('mouseover', function(){
      image.src = "/assets/img/pencil-blue.png"
    })
    button.addEventListener('mouseout', function(){
        image.src = "/assets/img/pencil-white.png"
      })
}

function changeCheckImgColor(){         //Changes the color of an icon on hover
    var image = document.getElementById("check-icon");
    var button = document.getElementById("check-button");
    button.addEventListener('mouseover', function(){
      image.src = "/assets/img/check-blue.png"
    })
    button.addEventListener('mouseout', function(){
        image.src = "/assets/img/check-white.png"
      })
}