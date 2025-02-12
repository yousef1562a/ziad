// العد التنازلي قبل بدء الصفحة
window.addEventListener("load", function() {
    let count = 10;
    const overlay = document.getElementById("countdownOverlay");
    const countdownNumber = document.getElementById("countdownNumber");
    const countdownInterval = setInterval(() => {
      countdownNumber.textContent = count;
      if (count < 8) {
        overlay.style.opacity = (count / 8).toString();
      }
      count--;
      if (count < 0) {
        clearInterval(countdownInterval);
        overlay.parentNode.removeChild(overlay);
      }
    }, 1000);
  });
  
  // الصوتيات
  const clickSound = document.getElementById("clickSound");
  const explosionSound = document.getElementById("explosionSound");
  
  const colors = ["#ff0040", "#ff8000", "#ffff00", "#40ff00", "#00ffff", "#0040ff", "#8000ff"];
  const launchButton = document.getElementById("launchButton");
  const buttonContainer = document.getElementById("buttonContainer");
  const imageContainer = document.getElementById("imageContainer");
  
  // وظائف الألعاب النارية
  function spawnFirework(x, delay) {
    const firework = document.createElement("div");
    firework.style.position = "absolute";
    firework.style.left = x + "px";
    firework.style.bottom = "0px";
    const explosionOffset = Math.random() * 300 + 200;
    const explosionY = window.innerHeight - explosionOffset;
    firework.dataset.explosionY = explosionY;
    document.body.appendChild(firework);
    setTimeout(() => { explodeFirework(firework, false); }, delay + 1500);
  }
  
  function explodeFirework(firework, isMain) {
    const explosionX = parseInt(firework.style.left);
    const explosionY = firework.dataset.explosionY ? parseInt(firework.dataset.explosionY) : (window.innerHeight - 500);
    firework.remove();
    const sparkCount = 30;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("div");
      spark.classList.add("spark");
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      spark.style.setProperty("--dx", dx + "px");
      spark.style.setProperty("--dy", dy + "px");
      const color = colors[Math.floor(Math.random() * colors.length)];
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 20px ${color}, 0 0 30px ${color}`;
      spark.style.left = explosionX + "px";
      spark.style.top = explosionY + "px";
      spark.style.animation = "spark-explode 1.2s ease-out forwards";
      document.body.appendChild(spark);
      setTimeout(() => { spark.remove(); }, 1200);
    }
    const text = document.createElement("div");
    text.classList.add("firework-text");
    text.textContent = "Hala";
    text.style.left = (explosionX - 20) + "px";
    text.style.top = (explosionY - 20) + "px";
    document.body.appendChild(text);
    setTimeout(() => {
      text.style.opacity = "0";
      setTimeout(() => { text.remove(); }, 500);
    }, 500);
    explosionSound.currentTime = 0;
    explosionSound.play();
  }
  
  function launchContinuousFireworks(duration) {
    const intervalTime = 700;
    const endTime = Date.now() + duration;
    const intervalId = setInterval(() => {
      if (Date.now() > endTime) { clearInterval(intervalId); return; }
      const randomX = Math.random() * window.innerWidth;
      spawnFirework(randomX, 0);
    }, intervalTime);
  }
  
  function spawnMainExplosionPersistent(duration) {
    const container = document.createElement("div");
    container.id = "mainExplosion";
    document.body.appendChild(container);
    const mainText = document.createElement("div");
    mainText.classList.add("main-text");
    mainText.textContent = "I love you Hala";
    container.appendChild(mainText);
    setTimeout(() => { mainText.style.opacity = "1"; }, 100);
    const interval = setInterval(() => {
      const spark = document.createElement("div");
      spark.classList.add("spark");
      const posX = Math.random() * container.clientWidth;
      const posY = Math.random() * container.clientHeight;
      spark.style.position = "absolute";
      spark.style.left = posX + "px";
      spark.style.top = posY + "px";
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 150 + 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      spark.style.setProperty("--dx", dx + "px");
      spark.style.setProperty("--dy", dy + "px");
      const color = colors[Math.floor(Math.random() * colors.length)];
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 25px ${color}, 0 0 35px ${color}`;
      spark.style.animation = "spark-explode-main 1.5s ease-out forwards";
      container.appendChild(spark);
      setTimeout(() => { spark.remove(); }, 1500);
    }, 200);
    setTimeout(() => { clearInterval(interval); container.remove(); }, duration);
  }
  
  /* Scene 2: Two pictures with text */
  function showTwoPicturesScene() {
    const sceneContainer = document.createElement("div");
    sceneContainer.id = "twoPicturesContainer";
    sceneContainer.style.position = "absolute";
    sceneContainer.style.top = "0";
    sceneContainer.style.left = "0";
    sceneContainer.style.width = "100%";
    sceneContainer.style.height = "100%";
    sceneContainer.style.zIndex = "20";
    sceneContainer.style.backgroundColor = "rgba(0,0,0,0.8)";
    sceneContainer.style.display = "flex";
    sceneContainer.style.flexDirection = "column";
    sceneContainer.style.justifyContent = "center";
    sceneContainer.style.gap = "2vh";
    sceneContainer.style.opacity = "0";
    sceneContainer.style.transition = "opacity 3s ease";
    document.body.appendChild(sceneContainer);
    
    const leftContainer = document.createElement("div");
    leftContainer.className = "final-img-container";
    leftContainer.style.display = "flex";
    leftContainer.style.flexDirection = "column";
    leftContainer.style.alignItems = "center";
    const imgLeft = document.createElement("img");
    imgLeft.src = "https://i.postimg.cc/L8DRz2PM/Whats-App-Image-2025-02-10-at-9-19-34-AM.jpg";
    imgLeft.style.width = "clamp(150px, 40vw, 300px)";
    imgLeft.style.height = "auto";
    leftContainer.appendChild(imgLeft);
    const leftText = document.createElement("div");
    leftText.className = "final-overlay-text";
    leftText.textContent = "ziad";
    leftContainer.appendChild(leftText);
    
    const rightContainer = document.createElement("div");
    rightContainer.className = "final-img-container";
    rightContainer.style.display = "flex";
    rightContainer.style.flexDirection = "column";
    rightContainer.style.alignItems = "center";
    const imgRight = document.createElement("img");
    imgRight.src = "https://i.postimg.cc/ZRcWYh6J/imghart.png";
    imgRight.style.width = "clamp(150px, 40vw, 300px)";
    imgRight.style.height = "auto";
    rightContainer.appendChild(imgRight);
    const rightText = document.createElement("div");
    rightText.className = "final-overlay-text";
    rightText.textContent = "hala";
    rightContainer.appendChild(rightText);
    
    const centerContainer = document.createElement("div");
    centerContainer.className = "final-img-container";
    centerContainer.style.display = "flex";
    centerContainer.style.flexDirection = "column";
    centerContainer.style.alignItems = "center";
    const centerText = document.createElement("div");
    centerText.className = "center-text";
    centerText.textContent = "🌹 i love you 🌹";
    centerContainer.appendChild(centerText);
    
    sceneContainer.appendChild(leftContainer);
    sceneContainer.appendChild(centerContainer);
    sceneContainer.appendChild(rightContainer);
    
    setTimeout(() => { sceneContainer.style.opacity = "1"; }, 100);
    setTimeout(() => { sceneContainer.remove(); }, 10000);
  }
  
  /* Scene 3: Image collage */
  function showThirdScene() {
    const finalImages = [
      "https://i.postimg.cc/ZRcWYh6J/imghart.png",
      "https://i.postimg.cc/905bMM1v/5.webp",
      "https://i.postimg.cc/gJ64mRyV/2.webp",
      "https://i.postimg.cc/1zdMkMFR/1.webp",
      "https://i.postimg.cc/Z5VwcJKd/image.webp",
      "https://i.postimg.cc/pdrqc3p1/Hala-heart.jpg",
      "https://i.postimg.cc/4xJ8VYZG/f4bfc684ca11df26048a7c6005273fe3.webp",
      "https://i.postimg.cc/C5GNfgQd/1.webp",
      "https://i.postimg.cc/ZYpjQ85Z/I-love-you-22.webp"
    ];
    const container = document.createElement("div");
    container.id = "thirdSceneContainer";
    container.style.width = "90vw";
    container.style.height = "90vh";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.zIndex = "30";
    container.style.background = "rgba(0,0,0,0.9)";
    container.style.transition = "opacity 3s ease";
    document.body.appendChild(container);
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    finalImages.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      const posX = Math.random() * (containerWidth - 150);
      const posY = Math.random() * (containerHeight - 150);
      img.style.position = "absolute";
      img.style.left = posX + "px";
      img.style.top = posY + "px";
      img.style.width = "clamp(80px, 20vw, 150px)";
      img.style.height = "auto";
      const rotation = Math.random() * 60 - 30;
      img.style.transform = "rotate(" + rotation + "deg)";
      container.appendChild(img);
    });
    setTimeout(() => { container.remove(); }, 10000);
  }
  
  /* Scene 4: Poem with balloons */
  function showPoemScene() {
    const poemContainer = document.createElement("div");
    poemContainer.id = "poemSceneContainer";
    poemContainer.style.background = "url('https://i.postimg.cc/PqPhdYzq/959-7.jpg') no-repeat center center";
    poemContainer.style.backgroundSize = "cover";
    poemContainer.style.transition = "opacity 3s ease";
    document.body.appendChild(poemContainer);
    
    const poemTextDiv = document.createElement("div");
    poemTextDiv.id = "poemTextDiv";
    poemTextDiv.style.position = "relative";
    poemTextDiv.style.zIndex = "2";
    poemContainer.appendChild(poemTextDiv);
    
    spawnBalloons(poemContainer);
    
    const poemLines = [
      "My heart whispers softly in the midnight air,",
      "Stars reveal dreams that we both share,",
      "Every beat sings a melody of passion,",
      "In your eyes, I behold visions of tomorrow,",
      "Your smile lights up my darkest hours,",
      "Gentle breezes carry our love so tenderly,",
      "Our souls entwine in a dance of destiny,",
      "Time stands still in the warmth of your embrace,",
      "Every moment with you is a verse of joy,",
      "Forever, I remain lost in your enchanting light."
    ];
    const decorations = [
      "❤️", "🌹", "✨", "💐", "💕", "🌸", "🌷", "🍀", "💖", "🌺"
    ];
    
    let currentLine = 0;
    const lineDuration = 6000;
    function displayNextLine() {
      if (currentLine < poemLines.length) {
        const lineElement = document.createElement("div");
        lineElement.id = "poemLine";
        lineElement.innerHTML = decorations[currentLine] + " " + poemLines[currentLine] + " " + decorations[currentLine];
        lineElement.style.whiteSpace = "nowrap";
        poemTextDiv.innerHTML = "";
        poemTextDiv.appendChild(lineElement);
        currentLine++;
      } else {
        clearInterval(poemInterval);
        poemTextDiv.innerHTML = "";
        setTimeout(() => {
          poemContainer.style.opacity = "0";
          setTimeout(() => { showPartyOverButton(); }, 500);
        }, 500);
      }
    }
    displayNextLine();
    const poemInterval = setInterval(displayNextLine, lineDuration);
    setTimeout(() => { clearInterval(poemInterval); }, poemLines.length * lineDuration + 100);
    setTimeout(() => { poemContainer.style.opacity = "1"; }, 100);
  }
  
  /* Spawn Balloons */
  function spawnBalloons(container) {
    const positions = [
      { top: "0px", left: "0px", animation: "balloon-topleft 10s ease-in-out infinite" },
      { top: "0px", right: "0px", animation: "balloon-topright 10s ease-in-out infinite" },
      { bottom: "0px", left: "0px", animation: "balloon-bottomleft 10s ease-in-out infinite" },
      { bottom: "0px", right: "0px", animation: "balloon-bottomright 10s ease-in-out infinite" }
    ];
    positions.forEach(pos => {
      const balloon = document.createElement("img");
      balloon.src = "https://i.postimg.cc/FzVRT60n/hala-2.png";
      balloon.classList.add("balloon");
      if (pos.top) balloon.style.top = pos.top;
      if (pos.bottom) balloon.style.bottom = pos.bottom;
      if (pos.left) balloon.style.left = pos.left;
      if (pos.right) balloon.style.right = pos.right;
      balloon.style.animation = pos.animation;
      container.appendChild(balloon);
    });
  }
  
  /* Party Over Button */
  function showPartyOverButton() {
    const partyButton = document.createElement("button");
    partyButton.id = "partyOverButton";
    partyButton.textContent = "انتهت الحفلة";
    document.body.appendChild(partyButton);
    setTimeout(() => { partyButton.style.opacity = "1"; }, 100);
    partyButton.addEventListener("click", () => {
      showFinalMessage();
      clickSound.currentTime = 0;
      clickSound.play();
    });
  }
  
  /* Final Message */
  function showFinalMessage() {
    const finalContainer = document.createElement("div");
    finalContainer.id = "finalMessageContainer";
    document.body.appendChild(finalContainer);
    
    const finalMessage = document.createElement("h1");
    finalMessage.textContent = "بحبك";
    finalContainer.appendChild(finalMessage);
    
    const balloonPositions = [
      { animation: "moveBalloonTopleft 3s forwards" },
      { animation: "moveBalloonTopright 3s forwards" },
      { animation: "moveBalloonBottomleft 3s forwards" },
      { animation: "moveBalloonBottomright 3s forwards" }
    ];
    balloonPositions.forEach(pos => {
      const balloon = document.createElement("img");
      balloon.src = "https://i.postimg.cc/FzVRT60n/hala-2.png";
      balloon.classList.add("balloon");
      balloon.style.top = "0px";
      balloon.style.left = "0px";
      balloon.style.animation = pos.animation;
      finalContainer.appendChild(balloon);
    });
    
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
      @-webkit-keyframes moveBalloonTopleft {
        0% { top: 0; left: 0; }
        100% { top: calc(50% - 150px); left: calc(50% - 150px); }
      }
      @keyframes moveBalloonTopleft {
        0% { top: 0; left: 0; }
        100% { top: calc(50% - 150px); left: calc(50% - 150px); }
      }
      @-webkit-keyframes moveBalloonTopright {
        0% { top: 0; right: 0; }
        100% { top: calc(50% - 150px); right: calc(50% - 150px); }
      }
      @keyframes moveBalloonTopright {
        0% { top: 0; right: 0; }
        100% { top: calc(50% - 150px); right: calc(50% - 150px); }
      }
      @-webkit-keyframes moveBalloonBottomleft {
        0% { bottom: 0; left: 0; }
        100% { bottom: calc(50% - 150px); left: calc(50% - 150px); }
      }
      @keyframes moveBalloonBottomleft {
        0% { bottom: 0; left: 0; }
        100% { bottom: calc(50% - 150px); left: calc(50% - 150px); }
      }
      @-webkit-keyframes moveBalloonBottomright {
        0% { bottom: 0; right: 0; }
        100% { bottom: calc(50% - 150px); right: calc(50% - 150px); }
      }
      @keyframes moveBalloonBottomright {
        0% { bottom: 0; right: 0; }
        100% { bottom: calc(50% - 150px); right: calc(50% - 150px); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    setTimeout(() => { finalContainer.style.opacity = "1"; }, 100);
    setTimeout(() => { location.reload(); }, 5000);
  }
  
  /* Timeline for scenes */
  launchButton.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    buttonContainer.style.opacity = "0";
    setTimeout(() => { buttonContainer.remove(); }, 500);
    imageContainer.style.opacity = "0";
    launchContinuousFireworks(15000);
    spawnMainExplosionPersistent(15000);
    
    setTimeout(() => { showTwoPicturesScene(); }, 15500);
    
    setTimeout(() => { showThirdScene(); }, 25500);
    
    setTimeout(() => { showPoemScene(); }, 35500);
  });
  