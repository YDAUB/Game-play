/* =========================================================
   PANCASILA EDU GAME
   game.js
   Single-player 2D Educational Exploration Game
   ========================================================= */

"use strict";

/* =========================================================
   1. KONFIGURASI UTAMA
   ========================================================= */

const QUIZIZZ_LINK = "[link quizziz di sini]";

const CHARACTER_FILES = [
    "karakter 1.png",
    "karakter 2.png",
    "karakter 3.png"
];

const TOTAL_MATERIALS = 6;

const GAME_CONFIG = {
    width: 1280,
    height: 720,

    player: {
        speed: 220,
        radius: 24,
        size: 72
    },

    interactionDistance: 90,

    colors: {
        navy: "#173B63",
        blue: "#0B4F9C",
        yellow: "#F4C542",
        white: "#FFFFFF",
        light: "#F4F6F8",
        dark: "#243447",
        green: "#2E8B57",
        red: "#C94C4C"
    }
};


/* =========================================================
   2. DATA MATERI
   ========================================================= */

const materials = [
    {
        id: 1,
        title: "Pancasila Dalam Kajian Sejarah",
        summary:
            "Pancasila terbentuk melalui proses sejarah panjang dan kemudian disahkan sebagai dasar negara Indonesia.",
        points: [
            "29 Mei–1 Juni 1945: Sidang BPUPK I membahas dasar negara.",
            "1 Juni 1945: Soekarno memperkenalkan istilah Pancasila.",
            "10–17 Juli 1945: Pembahasan dan perumusan Piagam Jakarta.",
            "18 Agustus 1945: Pancasila disahkan sebagai dasar negara dalam UUD 1945.",
            "Tokoh utama: Muhammad Yamin, Soepomo, dan Soekarno.",
            "Perjalanan Pancasila: Purbakala → Hindu-Buddha → Islam → Kolonialisme → BPUPK → Orde Lama → Orde Baru → Reformasi.",
            "Tantangan saat ini: korupsi, intoleransi, radikalisme, hoaks, dan politik identitas."
        ]
    },

    {
        id: 2,
        title: "Pancasila sebagai Sistem Filsafat",
        summary:
            "Pancasila merupakan sistem filsafat karena kelima silanya saling berhubungan dan menjadi dasar pemikiran kehidupan bangsa.",
        points: [
            "Filsafat = berpikir radikal, sistematis, menyeluruh, dan logis.",
            "Pancasila merupakan sistem yang utuh, bukan kumpulan nilai yang terpisah.",
            "Lima sila memiliki hubungan hierarkis-piramidal dan saling mengisi.",
            "Filsafat Pancasila mencakup:",
            "Ontologi → hakikat",
            "Epistemologi → cara memperoleh pengetahuan",
            "Aksiologi → nilai/kegunaan",
            "Pancasila menjadi pandangan hidup dan pedoman dalam kehidupan sehari-hari.",
            "Nilai Pancasila berasal dari budaya, agama, dan pengalaman sejarah bangsa Indonesia."
        ]
    },

    {
        id: 3,
        title: "Pancasila sebagai Ideologi",
        summary:
            "Pancasila merupakan ideologi terbuka yang menjadi jalan tengah antara berbagai ideologi dan menyesuaikan penerapannya dengan perkembangan zaman.",
        points: [
            "Ideologi = seperangkat nilai, gagasan, dan cita-cita yang menjadi pedoman.",
            "Pancasila adalah ideologi terbuka.",
            "Nilai dasar tetap, tetapi penerapannya dapat menyesuaikan perkembangan zaman.",
            "Menggabungkan nilai universal seperti HAM, keadilan, dan demokrasi dengan gotong royong dan toleransi.",
            "Menjaga keseimbangan antara kebebasan individu dan kepentingan bersama.",
            "Tantangan: radikalisme, disinformasi, kapitalisme global, dan politik identitas."
        ]
    },

    {
        id: 4,
        title: "Pancasila sebagai Dasar Negara",
        summary:
            "Pancasila merupakan dasar negara, sumber dari segala sumber hukum, dan landasan penyelenggaraan negara.",
        points: [
            "Pancasila menjadi sumber dari segala sumber hukum.",
            "Menjadi cita hukum dan landasan pembangunan nasional.",
            "Pancasila tercantum dalam Pembukaan UUD 1945 Alinea IV.",
            "Hubungan dengan UUD 1945:",
            "Formal: tercantum dalam Pembukaan UUD 1945.",
            "Material: menjadi isi pokok/fundamental Pembukaan UUD 1945.",
            "Pancasila diterapkan dalam bidang politik, ekonomi, sosial budaya, serta pertahanan dan keamanan.",
            "Kedudukan Pancasila tetap menjadi dasar negara meskipun UUD 1945 mengalami amandemen."
        ]
    },

    {
        id: 5,
        title: "Pancasila sebagai Sistem Etika",
        summary:
            "Pancasila sebagai sistem etika menjadi pedoman untuk menentukan baik-buruk dan benar-salah dalam kehidupan bermasyarakat dan bernegara.",
        points: [
            "Etika: pemikiran tentang baik-buruk dan benar-salah.",
            "Moral: nilai dan norma yang menjadi pedoman perilaku.",
            "Etiket: aturan sopan santun.",
            "Hubungan: Etika → Moral → Etiket.",
            "Aliran etika:",
            "Hedonisme",
            "Utilitarianisme",
            "Deontologi",
            "Etika kebajikan",
            "Etika Pancasila menggabungkan nilai religius, kemanusiaan, kebangsaan, demokrasi, dan keadilan.",
            "Pancasila menjadi pedoman menghadapi intoleransi, diskriminasi, konflik, korupsi, dan ketidakadilan."
        ]
    },

    {
        id: 6,
        title: "Pancasila dan IPTEK",
        summary:
            "Pancasila menjadi pedoman nilai dan moral agar perkembangan IPTEK tetap berorientasi pada manusia dan kepentingan masyarakat.",
        points: [
            "IPTEK memberikan manfaat sekaligus risiko.",
            "IPTEK membutuhkan nilai karena penggunaannya dipengaruhi kepentingan manusia.",
            "Pancasila sebagai filter IPTEK:",
            "Sila 1: sesuai moral.",
            "Sila 2: menjaga martabat manusia.",
            "Sila 3: memperkuat persatuan.",
            "Sila 4: bersifat inklusif.",
            "Sila 5: manfaatnya harus adil.",
            "Contoh isu: AI, Big Data, privasi, diskriminasi algoritma, media sosial, dan disinformasi.",
            "Intinya: IPTEK harus memanusiakan manusia, bukan merugikan manusia."
        ]
    }
];


/* =========================================================
   3. STATE GAME
   ========================================================= */

const gameState = {
    playerName: "",
    selectedCharacter: null,
    customAvatar: null,

    gameStarted: false,
    gameRunning: false,

    player: {
        x: 160,
        y: 360,
        width: GAME_CONFIG.player.size,
        height: GAME_CONFIG.player.size,
        speed: GAME_CONFIG.player.speed
    },

    keys: {
        up: false,
        down: false,
        left: false,
        right: false,
        interact: false
    },

    materialsCompleted: new Set(),
    currentNearbyMaterial: null,
    finishUnlocked: false,

    canvas: null,
    ctx: null,

    animationFrame: null,
    lastTime: 0,

    camera: {
        x: 0,
        y: 0
    },

    avatarImage: null,

    crop: {
        image: null,
        imageUrl: null,
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        startX: 0,
        startY: 0,
        dragging: false,
        moved: false
    }
};


/* =========================================================
   4. DOM HELPER
   ========================================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function findElement(...selectors) {
    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) return element;
    }

    return null;
}

function showElement(element) {
    if (!element) return;

    element.hidden = false;
    element.classList.add("active");
    element.removeAttribute("aria-hidden");
}

function hideElement(element) {
    if (!element) return;

    element.hidden = true;
    element.classList.remove("active");
    element.setAttribute("aria-hidden", "true");
}


/* =========================================================
   5. REFERENSI DOM
   ========================================================= */

const DOM = {
    landingScreen: findElement(
        "#landing-screen",
        "#landingScreen",
        ".landing-screen"
    ),

    nameScreen: findElement(
        "#name-screen",
        "#nameScreen",
        ".name-screen"
    ),

    characterScreen: findElement(
        "#character-screen",
        "#characterScreen",
        ".character-screen"
    ),

    gameScreen: findElement(
        "#game-screen",
        "#gameScreen",
        ".game-screen"
    ),

    gameContainer: findElement(
        "#game-container",
        ".game-container"
    ),

    nameInput: findElement(
        "#player-name",
        "#playerName",
        "#name-input",
        'input[name="player-name"]'
    ),

    nameError: findElement(
        "#name-error",
        "#nameError",
        ".name-error"
    ),

    startButton: findElement(
        "#start-button",
        "#startButton",
        "#btn-start"
    ),

    nameContinueButton: findElement(
        "#name-continue",
        "#nameContinue",
        "#continue-name",
        "#btn-name-continue"
    ),

    confirmCharacterButton: findElement(
        "#confirm-character",
        "#confirmCharacter",
        "#character-confirm",
        "#btn-confirm-character"
    ),

    uploadButton: findElement(
        "#upload-photo-button",
        "#uploadPhotoButton",
        "#upload-photo",
        "#btn-upload-photo"
    ),

    photoInput: findElement(
        "#photo-input",
        "#photoInput",
        "#photo-upload",
        'input[type="file"]'
    ),

    characterOptions: $all(
        ".character-option, .character-card, [data-character]"
    ),

    cropModal: findElement(
        "#crop-modal",
        "#cropModal",
        ".crop-modal"
    ),

    cropCanvas: findElement(
        "#crop-canvas",
        "#cropCanvas"
    ),

    cropPreview: findElement(
        "#crop-preview",
        "#cropPreview"
    ),

    cropZoomIn: findElement(
        "#crop-zoom-in",
        "#cropZoomIn",
        "#zoom-in"
    ),

    cropZoomOut: findElement(
        "#crop-zoom-out",
        "#cropZoomOut",
        "#zoom-out"
    ),

    cropReset: findElement(
        "#crop-reset",
        "#cropReset",
        "#reset-crop"
    ),

    cropCancel: findElement(
        "#crop-cancel",
        "#cropCancel",
        "#cancel-crop"
    ),

    cropConfirm: findElement(
        "#crop-confirm",
        "#cropConfirm",
        "#use-photo"
    ),

    materialModal: findElement(
        "#material-modal",
        "#materialModal",
        ".material-modal"
    ),

    materialTitle: findElement(
        "#material-title",
        "#materialTitle"
    ),

    materialSummary: findElement(
        "#material-summary",
        "#materialSummary"
    ),

    materialPoints: findElement(
        "#material-points",
        "#materialPoints"
    ),

    materialClose: findElement(
        "#material-close",
        "#materialClose",
        "#close-material"
    ),

    materialNext: findElement(
        "#material-next",
        "#materialNext",
        "#next-material"
    ),

    helpModal: findElement(
        "#help-modal",
        "#helpModal",
        ".help-modal"
    ),

    helpButton: findElement(
        "#help-button",
        "#helpButton",
        "#btn-help"
    ),

    helpClose: findElement(
        "#help-close",
        "#helpClose",
        "#close-help"
    ),

    exitButton: findElement(
        "#exit-button",
        "#exitButton",
        "#btn-exit"
    ),

    finishModal: findElement(
        "#finish-modal",
        "#finishModal",
        ".finish-modal"
    ),

    finishQuizizz: findElement(
        "#quizizz-button",
        "#quizizzButton",
        "#continue-quizizz",
        "#btn-quizizz"
    ),

    finishBack: findElement(
        "#finish-back",
        "#finishBack",
        "#return-game"
    ),

    playerNameHUD: findElement(
        "#hud-player-name",
        "#player-name-display",
        "#playerNameDisplay"
    ),

    progressHUD: findElement(
        "#material-progress",
        "#progress-text",
        "#progressText"
    ),

    progressBar: findElement(
        "#progress-bar",
        "#progressBar"
    ),

    interactionPrompt: findElement(
        "#interaction-prompt",
        "#interactionPrompt"
    ),

    feedback: findElement(
        "#game-feedback",
        "#gameFeedback",
        ".game-feedback"
    ),

    mobileUp: findElement("#mobile-up", "#btn-up"),
    mobileDown: findElement("#mobile-down", "#btn-down"),
    mobileLeft: findElement("#mobile-left", "#btn-left"),
    mobileRight: findElement("#mobile-right", "#btn-right"),
    mobileInteract: findElement("#mobile-interact", "#btn-interact")
};


/* =========================================================
   6. INISIALISASI
   ========================================================= */

document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
    setupInitialScreen();
    setupNameForm();
    setupCharacterSelection();
    setupPhotoUpload();
    setupCropper();
    setupControls();
    setupModalControls();
    setupGameCanvas();
    setupMobileControls();
    updateProgress();
}


/* =========================================================
   7. INITIAL SCREEN
   ========================================================= */

function setupInitialScreen() {
    if (DOM.startButton) {
        DOM.startButton.addEventListener("click", () => {
            hideElement(DOM.landingScreen);
            showElement(DOM.nameScreen);

            if (DOM.nameInput) {
                setTimeout(() => DOM.nameInput.focus(), 100);
            }
        });
    }
}


/* =========================================================
   8. SISTEM NAMA PEMAIN
   ========================================================= */

function setupNameForm() {
    if (!DOM.nameContinueButton) return;

    DOM.nameContinueButton.addEventListener("click", handleNameSubmit);

    if (DOM.nameInput) {
        DOM.nameInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                handleNameSubmit();
            }
        });

        DOM.nameInput.addEventListener("input", () => {
            if (DOM.nameError) {
                DOM.nameError.textContent = "";
                DOM.nameError.classList.remove("visible");
            }
        });
    }
}

function handleNameSubmit() {
    if (!DOM.nameInput) return;

    const name = DOM.nameInput.value.trim();

    if (!name) {
        showNameError("Nama pemain wajib diisi.");
        DOM.nameInput.focus();
        return;
    }

    if (name.length > 20) {
        showNameError("Nama pemain maksimal 20 karakter.");
        DOM.nameInput.focus();
        return;
    }

    gameState.playerName = name;

    hideElement(DOM.nameScreen);
    showElement(DOM.characterScreen);

    updatePlayerNameHUD();
}

function showNameError(message) {
    if (!DOM.nameError) {
        alert(message);
        return;
    }

    DOM.nameError.textContent = message;
    DOM.nameError.classList.add("visible");
}


/* =========================================================
   9. SISTEM PEMILIHAN KARAKTER
   ========================================================= */

function setupCharacterSelection() {
    const options = DOM.characterOptions;

    options.forEach((option, index) => {
        const characterIndex =
            option.dataset.character !== undefined
                ? Number(option.dataset.character)
                : index;

        option.addEventListener("click", () => {
            if (characterIndex >= 0 && characterIndex < 3) {
                selectBuiltInCharacter(characterIndex, option);
            }
        });

        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                if (characterIndex >= 0 && characterIndex < 3) {
                    selectBuiltInCharacter(characterIndex, option);
                }
            }
        });
    });

    if (DOM.confirmCharacterButton) {
        DOM.confirmCharacterButton.addEventListener(
            "click",
            confirmCharacterSelection
        );
    }
}

function selectBuiltInCharacter(index, element) {
    gameState.selectedCharacter = {
        type: "builtin",
        index,
        source: CHARACTER_FILES[index]
    };

    gameState.customAvatar = null;

    DOM.characterOptions.forEach((option) => {
        option.classList.remove(
            "selected",
            "active",
            "is-selected"
        );

        option.setAttribute("aria-pressed", "false");
    });

    if (element) {
        element.classList.add(
            "selected",
            "active",
            "is-selected"
        );

        element.setAttribute("aria-pressed", "true");
    }

    loadAvatarImage(CHARACTER_FILES[index]);
}

function confirmCharacterSelection() {
    if (!gameState.selectedCharacter) {
        showTemporaryFeedback("Silakan pilih karakter terlebih dahulu.");
        return;
    }

    hideElement(DOM.characterScreen);
    showElement(DOM.gameScreen);

    startGame();
}


/* =========================================================
   10. LOAD CHARACTER IMAGE
   ========================================================= */

function loadAvatarImage(source) {
    const image = new Image();

    image.onload = () => {
        gameState.avatarImage = image;
    };

    image.onerror = () => {
        console.warn(
            `Karakter tidak ditemukan: ${source}. Menggunakan fallback.`
        );

        gameState.avatarImage = null;

        showTemporaryFeedback(
            "File karakter tidak ditemukan. Fallback karakter digunakan."
        );
    };

    image.src = source;
}


/* =========================================================
   11. UPLOAD FOTO
   ========================================================= */

function setupPhotoUpload() {
    if (DOM.uploadButton && DOM.photoInput) {
        DOM.uploadButton.addEventListener("click", () => {
            DOM.photoInput.click();
        });
    }

    if (!DOM.photoInput) return;

    DOM.photoInput.accept =
        "image/png,image/jpeg,image/webp";

    DOM.photoInput.addEventListener("change", handlePhotoUpload);
}

function handlePhotoUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
        showTemporaryFeedback(
            "Format gambar tidak valid. Gunakan PNG, JPG/JPEG, atau WEBP."
        );

        event.target.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        const image = new Image();

        image.onload = () => {
            openCropEditor(image);
        };

        image.onerror = () => {
            showTemporaryFeedback(
                "Foto gagal dibaca. Silakan pilih foto lain."
            );
        };

        image.src = loadEvent.target.result;
    };

    reader.onerror = () => {
        showTemporaryFeedback(
            "Foto gagal dibaca oleh browser."
        );
    };

    reader.readAsDataURL(file);
}


/* =========================================================
   12. CROP EDITOR
   ========================================================= */

function setupCropper() {
    if (!DOM.cropCanvas) return;

    DOM.cropCanvas.addEventListener(
        "pointerdown",
        startCropDrag
    );

    DOM.cropCanvas.addEventListener(
        "pointermove",
        moveCropDrag
    );

    DOM.cropCanvas.addEventListener(
        "pointerup",
        endCropDrag
    );

    DOM.cropCanvas.addEventListener(
        "pointercancel",
        endCropDrag
    );

    DOM.cropCanvas.addEventListener(
        "wheel",
        handleCropWheel,
        { passive: false }
    );

    if (DOM.cropZoomIn) {
        DOM.cropZoomIn.addEventListener(
            "click",
            () => changeCropZoom(0.1)
        );
    }

    if (DOM.cropZoomOut) {
        DOM.cropZoomOut.addEventListener(
            "click",
            () => changeCropZoom(-0.1)
        );
    }

    if (DOM.cropReset) {
        DOM.cropReset.addEventListener(
            "click",
            resetCrop
        );
    }

    if (DOM.cropCancel) {
        DOM.cropCancel.addEventListener(
            "click",
            cancelCrop
        );
    }

    if (DOM.cropConfirm) {
        DOM.cropConfirm.addEventListener(
            "click",
            confirmCrop
        );
    }
}

function openCropEditor(image) {
    gameState.crop.image = image;

    gameState.crop.scale = calculateInitialCropScale(image);

    gameState.crop.offsetX = 0;
    gameState.crop.offsetY = 0;

    gameState.crop.imageUrl = image.src;

    renderCrop();

    showElement(DOM.cropModal);
}

function calculateInitialCropScale(image) {
    const canvas = DOM.cropCanvas;

    if (!canvas) return 1;

    const size = Math.min(
        canvas.width || 400,
        canvas.height || 400
    );

    const maxDimension =
        Math.max(image.naturalWidth, image.naturalHeight);

    return maxDimension > 0
        ? size / maxDimension
        : 1;
}

function resetCrop() {
    const image = gameState.crop.image;

    if (!image) return;

    gameState.crop.scale =
        calculateInitialCropScale(image);

    gameState.crop.offsetX = 0;
    gameState.crop.offsetY = 0;

    renderCrop();
}

function changeCropZoom(amount) {
    const oldScale = gameState.crop.scale;

    gameState.crop.scale = clamp(
        oldScale + amount,
        0.05,
        8
    );

    renderCrop();
}

function handleCropWheel(event) {
    event.preventDefault();

    const delta =
        event.deltaY > 0 ? -0.05 : 0.05;

    changeCropZoom(delta);
}

function startCropDrag(event) {
    if (!gameState.crop.image) return;

    gameState.crop.dragging = true;
    gameState.crop.moved = false;

    gameState.crop.startX = event.clientX;
    gameState.crop.startY = event.clientY;

    DOM.cropCanvas.setPointerCapture?.(
        event.pointerId
    );
}

function moveCropDrag(event) {
    if (!gameState.crop.dragging) return;

    const dx =
        event.clientX - gameState.crop.startX;

    const dy =
        event.clientY - gameState.crop.startY;

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        gameState.crop.moved = true;
    }

    gameState.crop.offsetX += dx;
    gameState.crop.offsetY += dy;

    gameState.crop.startX = event.clientX;
    gameState.crop.startY = event.clientY;

    renderCrop();
}

function endCropDrag(event) {
    gameState.crop.dragging = false;

    DOM.cropCanvas?.releasePointerCapture?.(
        event.pointerId
    );
}

function renderCrop() {
    const canvas = DOM.cropCanvas;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const displaySize = getCropCanvasSize();

    canvas.width = displaySize;
    canvas.height = displaySize;

    /*
     * Jangan mengisi canvas dengan warna apa pun.
     * Dengan demikian PNG transparan tetap mempertahankan alpha.
     */
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const image = gameState.crop.image;

    if (!image) return;

    const drawWidth =
        image.naturalWidth * gameState.crop.scale;

    const drawHeight =
        image.naturalHeight * gameState.crop.scale;

    const x =
        (canvas.width - drawWidth) / 2 +
        gameState.crop.offsetX;

    const y =
        (canvas.height - drawHeight) / 2 +
        gameState.crop.offsetY;

    ctx.drawImage(
        image,
        x,
        y,
        drawWidth,
        drawHeight
    );

    drawCropOverlay(ctx, canvas.width);
}

function getCropCanvasSize() {
    const parent =
        DOM.cropCanvas.parentElement;

    const parentWidth =
        parent?.clientWidth || 400;

    const parentHeight =
        parent?.clientHeight || 400;

    return Math.max(
        160,
        Math.min(
            parentWidth,
            parentHeight,
            520
        )
    );
}

function drawCropOverlay(ctx, size) {
    /*
     * Overlay menggunakan compositing ringan.
     * Area tengah tetap menjadi area crop 1:1.
     */

    ctx.save();

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.28)";

    ctx.fillRect(
        0,
        0,
        size,
        size
    );

    ctx.globalCompositeOperation =
        "destination-out";

    const padding = Math.max(
        10,
        size * 0.04
    );

    ctx.fillRect(
        padding,
        padding,
        size - padding * 2,
        size - padding * 2
    );

    ctx.restore();

    ctx.save();

    ctx.strokeStyle =
        "rgba(255,255,255,0.95)";

    ctx.lineWidth = 2;

    const padding = Math.max(
        10,
        size * 0.04
    );

    ctx.strokeRect(
        padding,
        padding,
        size - padding * 2,
        size - padding * 2
    );

    ctx.restore();
}

function confirmCrop() {
    const image = gameState.crop.image;

    if (!image || !DOM.cropCanvas) {
        showTemporaryFeedback(
            "Foto belum tersedia."
        );

        return;
    }

    /*
     * Hasil final selalu berupa PNG agar alpha channel
     * dari PNG transparan tetap dipertahankan.
     */

    const outputSize = 512;

    const outputCanvas =
        document.createElement("canvas");

    outputCanvas.width = outputSize;
    outputCanvas.height = outputSize;

    const ctx =
        outputCanvas.getContext("2d");

    if (!ctx) return;

    /*
     * Tidak ada fillRect / background.
     * Canvas tetap transparan.
     */

    const sourceCanvas =
        DOM.cropCanvas;

    const cropRect = getCropRect(
        sourceCanvas.width
    );

    const sourceScale =
        sourceCanvas.width / outputSize;

    /*
     * Karena crop editor berbentuk 1:1,
     * area crop dapat dipindahkan ke canvas output.
     */

    ctx.drawImage(
        sourceCanvas,
        cropRect.x,
        cropRect.y,
        cropRect.size,
        cropRect.size,
        0,
        0,
        outputSize,
        outputSize
    );

    const dataURL =
        outputCanvas.toDataURL(
            "image/png"
        );

    gameState.customAvatar = dataURL;

    gameState.selectedCharacter = {
        type: "custom",
        index: null,
        source: dataURL
    };

    gameState.avatarImage =
        createImageFromDataURL(dataURL);

    /*
     * Tandai opsi upload sebagai karakter terpilih.
     */

    DOM.characterOptions.forEach((option) => {
        option.classList.remove(
            "selected",
            "active",
            "is-selected"
        );

        option.setAttribute(
            "aria-pressed",
            "false"
        );
    });

    const uploadOption =
        findElement(
            "[data-character='custom']",
            ".upload-character-option",
            "#upload-character-option"
        );

    if (uploadOption) {
        uploadOption.classList.add(
            "selected",
            "active",
            "is-selected"
        );

        uploadOption.setAttribute(
            "aria-pressed",
            "true"
        );
    }

    closeCropEditor();
}

function getCropRect(size) {
    const padding = Math.max(
        10,
        size * 0.04
    );

    return {
        x: padding,
        y: padding,
        size: size - padding * 2
    };
}

function createImageFromDataURL(dataURL) {
    const image = new Image();

    image.onload = () => {
        gameState.avatarImage = image;
    };

    image.src = dataURL;

    return image;
}

function cancelCrop() {
    closeCropEditor();
}

function closeCropEditor() {
    hideElement(DOM.cropModal);

    gameState.crop.image = null;
    gameState.crop.imageUrl = null;
    gameState.crop.dragging = false;

    if (DOM.photoInput) {
        DOM.photoInput.value = "";
    }
}


/* =========================================================
   13. GAME CANVAS
   ========================================================= */

function setupGameCanvas() {
    if (!DOM.gameContainer) return;

    /*
     * Jika index.html sudah menyediakan canvas,
     * gunakan canvas tersebut.
     */

    let canvas =
        DOM.gameContainer.querySelector(
            "#game-canvas, canvas"
        );

    if (!canvas) {
        canvas =
            document.createElement("canvas");

        canvas.id = "game-canvas";

        DOM.gameContainer.appendChild(
            canvas
        );
    }

    DOM.gameCanvas = canvas;

    gameState.canvas = canvas;
    gameState.ctx =
        canvas.getContext("2d");

    resizeGameCanvas();

    window.addEventListener(
        "resize",
        resizeGameCanvas
    );
}

function resizeGameCanvas() {
    const canvas = gameState.canvas;

    if (!canvas) return;

    const container =
        DOM.gameContainer;

    const width =
        container?.clientWidth ||
        GAME_CONFIG.width;

    const height =
        container?.clientHeight ||
        GAME_CONFIG.height;

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    canvas.width =
        Math.max(1, width * dpr);

    canvas.height =
        Math.max(1, height * dpr);

    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;

    gameState.ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    renderGame();
}


/* =========================================================
   14. START GAME
   ========================================================= */

function startGame() {
    if (!gameState.canvas) {
        setupGameCanvas();
    }

    gameState.gameStarted = true;
    gameState.gameRunning = true;

    gameState.player.x = 150;
    gameState.player.y = 360;

    gameState.materialsCompleted =
        new Set();

    gameState.currentNearbyMaterial =
        null;

    gameState.finishUnlocked =
        false;

    updatePlayerNameHUD();
    updateProgress();

    setupMaterials();

    gameState.lastTime =
        performance.now();

    cancelAnimationFrame(
        gameState.animationFrame
    );

    gameState.animationFrame =
        requestAnimationFrame(
            gameLoop
        );
}


/* =========================================================
   15. MAP DATA
   ========================================================= */

const mapData = {
    width: 1280,
    height: 720,

    start: {
        x: 150,
        y: 360
    },

    finish: {
        x: 1110,
        y: 360,
        width: 100,
        height: 120
    },

    materials: []
};

function setupMaterials() {
    mapData.materials = [
        {
            ...materials[0],
            x: 350,
            y: 190,
            color: GAME_CONFIG.colors.yellow,
            icon: "1"
        },

        {
            ...materials[1],
            x: 610,
            y: 190,
            color: GAME_CONFIG.colors.blue,
            icon: "2"
        },

        {
            ...materials[2],
            x: 880,
            y: 190,
            color: GAME_CONFIG.colors.yellow,
            icon: "3"
        },

        {
            ...materials[3],
            x: 350,
            y: 520,
            color: GAME_CONFIG.colors.blue,
            icon: "4"
        },

        {
            ...materials[4],
            x: 610,
            y: 520,
            color: GAME_CONFIG.colors.yellow,
            icon: "5"
        },

        {
            ...materials[5],
            x: 880,
            y: 520,
            color: GAME_CONFIG.colors.blue,
            icon: "6"
        }
    ];
}


/* =========================================================
   16. GAME LOOP
   ========================================================= */

function gameLoop(timestamp) {
    if (!gameState.gameRunning) {
        return;
    }

    const delta =
        Math.min(
            (timestamp - gameState.lastTime) / 1000,
            0.05
        );

    gameState.lastTime =
        timestamp;

    updatePlayer(delta);
    checkMaterialInteraction();
    checkFinishInteraction();
    renderGame();

    gameState.animationFrame =
        requestAnimationFrame(
            gameLoop
        );
}


/* =========================================================
   17. PLAYER MOVEMENT
   ========================================================= */

function updatePlayer(delta) {
    const player =
        gameState.player;

    let dx = 0;
    let dy = 0;

    if (gameState.keys.left) dx -= 1;
    if (gameState.keys.right) dx += 1;
    if (gameState.keys.up) dy -= 1;
    if (gameState.keys.down) dy += 1;

    if (dx !== 0 || dy !== 0) {
        const length =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        dx /= length;
        dy /= length;

        const movement =
            player.speed * delta;

        const nextX =
            player.x +
            dx * movement;

        const nextY =
            player.y +
            dy * movement;

        if (canMoveTo(nextX, player.y)) {
            player.x = nextX;
        }

        if (canMoveTo(player.x, nextY)) {
            player.y = nextY;
        }
    }

    updateCamera();
}

function canMoveTo(x, y) {
    const margin = 38;

    if (
        x < margin ||
        x > mapData.width - margin
    ) {
        return false;
    }

    if (
        y < margin ||
        y > mapData.height - margin
    ) {
        return false;
    }

    /*
     * Collision sederhana dengan beberapa dekorasi.
     * Area jalan tetap cukup luas agar eksplorasi nyaman.
     */

    const obstacles = getCollisionObjects();

    const playerRadius =
        GAME_CONFIG.player.radius;

    for (const obstacle of obstacles) {
        if (
            circleRectCollision(
                x,
                y,
                playerRadius,
                obstacle
            )
        ) {
            return false;
        }
    }

    return true;
}

function getCollisionObjects() {
    return [
        {
            x: 505,
            y: 310,
            width: 70,
            height: 45
        },

        {
            x: 700,
            y: 310,
            width: 70,
            height: 45
        },

        {
            x: 505,
            y: 365,
            width: 70,
            height: 45
        },

        {
            x: 700,
            y: 365,
            width: 70,
            height: 45
        }
    ];
}

function circleRectCollision(
    cx,
    cy,
    radius,
    rect
) {
    const closestX =
        clamp(
            cx,
            rect.x,
            rect.x + rect.width
        );

    const closestY =
        clamp(
            cy,
            rect.y,
            rect.y + rect.height
        );

    const dx =
        cx - closestX;

    const dy =
        cy - closestY;

    return (
        dx * dx +
        dy * dy <
        radius * radius
    );
}


/* =========================================================
   18. CAMERA
   ========================================================= */

function updateCamera() {
    if (!gameState.canvas) return;

    const width =
        gameState.canvas.clientWidth ||
        GAME_CONFIG.width;

    const height =
        gameState.canvas.clientHeight ||
        GAME_CONFIG.height;

    gameState.camera.x =
        clamp(
            gameState.player.x -
                width / 2,
            0,
            Math.max(
                0,
                mapData.width - width
            )
        );

    gameState.camera.y =
        clamp(
            gameState.player.y -
                height / 2,
            0,
            Math.max(
                0,
                mapData.height - height
            )
        );
}


/* =========================================================
   19. INTERAKSI MATERI
   ========================================================= */

function checkMaterialInteraction() {
    const player =
        gameState.player;

    let nearest = null;
    let nearestDistance =
        Infinity;

    for (const material of mapData.materials) {
        const distance =
            distanceBetween(
                player.x,
                player.y,
                material.x,
                material.y
            );

        if (
            distance <=
            GAME_CONFIG.interactionDistance &&
            distance < nearestDistance
        ) {
            nearest = material;
            nearestDistance = distance;
        }
    }

    gameState.currentNearbyMaterial =
        nearest;

    if (nearest) {
        showInteractionPrompt(
            isMaterialCompleted(nearest.id)
                ? "Tekan E untuk membaca kembali"
                : "Tekan E untuk membaca"
        );
    } else {
        hideInteractionPrompt();
    }

    if (
        nearest &&
        gameState.keys.interact
    ) {
        gameState.keys.interact = false;

        openMaterialModal(nearest.id);
    }
}

function openMaterialModal(materialId) {
    const material =
        materials.find(
            item => item.id === materialId
        );

    if (!material || !DOM.materialModal) {
        return;
    }

    if (DOM.materialTitle) {
        DOM.materialTitle.textContent =
            material.title;
    }

    if (DOM.materialSummary) {
        DOM.materialSummary.textContent =
            material.summary;
    }

    if (DOM.materialPoints) {
        DOM.materialPoints.innerHTML = "";

        material.points.forEach(
            (point) => {
                const li =
                    document.createElement("li");

                li.textContent = point;

                DOM.materialPoints.appendChild(
                    li
                );
            }
        );
    }

    if (DOM.materialNext) {
        DOM.materialNext.dataset.materialId =
            String(materialId);

        DOM.materialNext.disabled =
            materialId >= TOTAL_MATERIALS;
    }

    showElement(DOM.materialModal);

    markMaterialCompleted(materialId);
}

function closeMaterialModal() {
    hideElement(DOM.materialModal);
}

function markMaterialCompleted(materialId) {
    if (
        gameState.materialsCompleted.has(
            materialId
        )
    ) {
        return;
    }

    gameState.materialsCompleted.add(
        materialId
    );

    updateProgress();

    showTemporaryFeedback(
        `Materi ${materialId} selesai dibaca`
    );

    if (
        gameState.materialsCompleted.size ===
        TOTAL_MATERIALS
    ) {
        unlockFinish();
    }
}

function isMaterialCompleted(materialId) {
    return gameState.materialsCompleted.has(
        materialId
    );
}


/* =========================================================
   20. PROGRESS
   ========================================================= */

function updateProgress() {
    const completed =
        gameState.materialsCompleted.size;

    const text =
        `${completed} / ${TOTAL_MATERIALS}`;

    if (DOM.progressHUD) {
        DOM.progressHUD.textContent =
            text;
    }

    if (DOM.progressBar) {
        const percentage =
            (completed /
                TOTAL_MATERIALS) *
            100;

        DOM.progressBar.style.width =
            `${percentage}%`;

        DOM.progressBar.setAttribute(
            "aria-valuenow",
            String(completed)
        );
    }

    if (
        completed ===
        TOTAL_MATERIALS
    ) {
        unlockFinish();
    }
}


/* =========================================================
   21. FINISH AREA
   ========================================================= */

function unlockFinish() {
    if (gameState.finishUnlocked) {
        return;
    }

    gameState.finishUnlocked = true;

    showTemporaryFeedback(
        "Semua materi telah dipelajari!"
    );
}

function checkFinishInteraction() {
    if (!gameState.finishUnlocked) {
        return;
    }

    const finish =
        mapData.finish;

    const distance =
        distanceBetween(
            gameState.player.x,
            gameState.player.y,
            finish.x,
            finish.y
        );

    if (
        distance <=
        GAME_CONFIG.interactionDistance + 20
    ) {
        showInteractionPrompt(
            "Tekan E untuk menyelesaikan"
        );

        if (gameState.keys.interact) {
            gameState.keys.interact = false;
            openFinishModal();
        }
    }
}

function openFinishModal() {
    if (!DOM.finishModal) return;

    gameState.gameRunning = false;

    showElement(DOM.finishModal);
}

function closeFinishModal() {
    hideElement(DOM.finishModal);

    gameState.gameRunning = true;

    gameState.lastTime =
        performance.now();

    gameState.animationFrame =
        requestAnimationFrame(
            gameLoop
        );
}


/* =========================================================
   22. QUIZIZZ
   ========================================================= */

function openQuizizz() {
    if (
        !QUIZIZZ_LINK ||
        QUIZIZZ_LINK ===
            "[link quizziz di sini]"
    ) {
        showTemporaryFeedback(
            "Link Quizizz belum diisi. Ganti nilai QUIZIZZ_LINK di game.js terlebih dahulu."
        );

        return;
    }

    try {
        window.open(
            QUIZIZZ_LINK,
            "_blank",
            "noopener,noreferrer"
        );
    } catch (error) {
        console.error(
            "Gagal membuka Quizizz:",
            error
        );
    }
}


/* =========================================================
   23. MODAL CONTROL
   ========================================================= */

function setupModalControls() {
    if (DOM.materialClose) {
        DOM.materialClose.addEventListener(
            "click",
            closeMaterialModal
        );
    }

    if (DOM.materialNext) {
        DOM.materialNext.addEventListener(
            "click",
            () => {
                const currentId =
                    Number(
                        DOM.materialNext.dataset
                            .materialId
                    );

                const nextId =
                    currentId + 1;

                if (
                    nextId <=
                    TOTAL_MATERIALS
                ) {
                    openMaterialModal(
                        nextId
                    );
                }
            }
        );
    }

    if (DOM.helpButton) {
        DOM.helpButton.addEventListener(
            "click",
            openHelpModal
        );
    }

    if (DOM.helpClose) {
        DOM.helpClose.addEventListener(
            "click",
            closeHelpModal
        );
    }

    if (DOM.exitButton) {
        DOM.exitButton.addEventListener(
            "click",
            handleExitGame
        );
    }

    if (DOM.finishQuizizz) {
        DOM.finishQuizizz.addEventListener(
            "click",
            openQuizizz
        );
    }

    if (DOM.finishBack) {
        DOM.finishBack.addEventListener(
            "click",
            closeFinishModal
        );
    }

    setupBackdropClosing();
}

function openHelpModal() {
    showElement(DOM.helpModal);
}

function closeHelpModal() {
    hideElement(DOM.helpModal);
}

function handleExitGame() {
    const confirmed =
        window.confirm(
            "Apakah kamu yakin ingin keluar dari permainan?"
        );

    if (!confirmed) return;

    stopGame();

    hideElement(DOM.gameScreen);
    hideElement(DOM.characterScreen);
    hideElement(DOM.nameScreen);
    hideElement(DOM.materialModal);
    hideElement(DOM.helpModal);
    hideElement(DOM.finishModal);

    showElement(DOM.landingScreen);
}

function setupBackdropClosing() {
    [
        DOM.materialModal,
        DOM.helpModal,
        DOM.cropModal,
        DOM.finishModal
    ].forEach((modal) => {
        if (!modal) return;

        modal.addEventListener(
            "click",
            (event) => {
                if (
                    event.target !== modal
                ) {
                    return;
                }

                if (
                    modal ===
                    DOM.materialModal
                ) {
                    closeMaterialModal();
                }

                if (
                    modal ===
                    DOM.helpModal
                ) {
                    closeHelpModal();
                }

                if (
                    modal ===
                    DOM.cropModal
                ) {
                    cancelCrop();
                }

                if (
                    modal ===
                    DOM.finishModal
                ) {
                    closeFinishModal();
                }
            }
        );
    });
}


/* =========================================================
   24. KEYBOARD CONTROL
   ========================================================= */

function setupControls() {
    document.addEventListener(
        "keydown",
        handleKeyDown
    );

    document.addEventListener(
        "keyup",
        handleKeyUp
    );
}

function handleKeyDown(event) {
    const key =
        event.key.toLowerCase();

    if (
        [
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright",
            " ",
            "e",
            "enter"
        ].includes(key)
    ) {
        event.preventDefault();
    }

    switch (key) {
        case "w":
        case "arrowup":
            gameState.keys.up = true;
            break;

        case "s":
        case "arrowdown":
            gameState.keys.down = true;
            break;

        case "a":
        case "arrowleft":
            gameState.keys.left = true;
            break;

        case "d":
        case "arrowright":
            gameState.keys.right = true;
            break;

        case "e":
        case "enter":
        case " ":
            if (!gameState.keys.interact) {
                gameState.keys.interact = true;
            }
            break;
    }
}

function handleKeyUp(event) {
    const key =
        event.key.toLowerCase();

    switch (key) {
        case "w":
        case "arrowup":
            gameState.keys.up = false;
            break;

        case "s":
        case "arrowdown":
            gameState.keys.down = false;
            break;

        case "a":
        case "arrowleft":
            gameState.keys.left = false;
            break;

        case "d":
        case "arrowright":
            gameState.keys.right = false;
            break;

        case "e":
        case "enter":
        case " ":
            gameState.keys.interact = false;
            break;
    }
}


/* =========================================================
   25. MOBILE CONTROL
   ========================================================= */

function setupMobileControls() {
    bindVirtualButton(
        DOM.mobileUp,
        "up"
    );

    bindVirtualButton(
        DOM.mobileDown,
        "down"
    );

    bindVirtualButton(
        DOM.mobileLeft,
        "left"
    );

    bindVirtualButton(
        DOM.mobileRight,
        "right"
    );

    if (DOM.mobileInteract) {
        DOM.mobileInteract.addEventListener(
            "pointerdown",
            (event) => {
                event.preventDefault();

                gameState.keys.interact =
                    true;

                setTimeout(() => {
                    gameState.keys.interact =
                        false;
                }, 100);
            }
        );
    }
}

function bindVirtualButton(
    button,
    direction
) {
    if (!button) return;

    const start = (event) => {
        event.preventDefault();

        gameState.keys[direction] =
            true;
    };

    const end = (event) => {
        event.preventDefault();

        gameState.keys[direction] =
            false;
    };

    button.addEventListener(
        "pointerdown",
        start
    );

    button.addEventListener(
        "pointerup",
        end
    );

    button.addEventListener(
        "pointercancel",
        end
    );

    button.addEventListener(
        "pointerleave",
        end
    );
}


/* =========================================================
   26. INTERACTION PROMPT
   ========================================================= */

function showInteractionPrompt(text) {
    if (!DOM.interactionPrompt) return;

    DOM.interactionPrompt.textContent =
        text;

    DOM.interactionPrompt.classList.add(
        "visible",
        "active"
    );

    DOM.interactionPrompt.removeAttribute(
        "hidden"
    );
}

function hideInteractionPrompt() {
    if (!DOM.interactionPrompt) return;

    DOM.interactionPrompt.classList.remove(
        "visible",
        "active"
    );

    DOM.interactionPrompt.setAttribute(
        "hidden",
        ""
    );
}


/* =========================================================
   27. FEEDBACK
   ========================================================= */

let feedbackTimeout = null;

function showTemporaryFeedback(message) {
    if (!DOM.feedback) {
        console.info(message);
        return;
    }

    DOM.feedback.textContent =
        message;

    DOM.feedback.classList.add(
        "visible",
        "active"
    );

    DOM.feedback.removeAttribute(
        "hidden"
    );

    clearTimeout(
        feedbackTimeout
    );

    feedbackTimeout =
        setTimeout(() => {
            DOM.feedback.classList.remove(
                "visible",
                "active"
            );

            DOM.feedback.setAttribute(
                "hidden",
                ""
            );
        }, 2600);
}


/* =========================================================
   28. HUD
   ========================================================= */

function updatePlayerNameHUD() {
    if (!DOM.playerNameHUD) return;

    DOM.playerNameHUD.textContent =
        gameState.playerName ||
        "Pemain";
}


/* =========================================================
   29. RENDER GAME
   ========================================================= */

function renderGame() {
    const canvas =
        gameState.canvas;

    const ctx =
        gameState.ctx;

    if (!canvas || !ctx) {
        return;
    }

    const width =
        canvas.clientWidth ||
        GAME_CONFIG.width;

    const height =
        canvas.clientHeight ||
        GAME_CONFIG.height;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    ctx.save();

    /*
     * Background map.
     */

    drawMapBackground(
        ctx,
        width,
        height
    );

    ctx.translate(
        -gameState.camera.x,
        -gameState.camera.y
    );

    drawMapWorld(ctx);
    drawMaterials(ctx);
    drawFinish(ctx);
    drawPlayer(ctx);

    ctx.restore();
}


/* =========================================================
   30. MAP BACKGROUND
   ========================================================= */

function drawMapBackground(
    ctx,
    width,
    height
) {
    ctx.fillStyle =
        "#EAF1F7";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}

function drawMapWorld(ctx) {
    /*
     * Area rumput.
     */

    ctx.fillStyle =
        "#DDEBD8";

    ctx.fillRect(
        0,
        0,
        mapData.width,
        mapData.height
    );

    /*
     * Jalan utama horizontal.
     */

    ctx.fillStyle =
        "#F4F6F8";

    ctx.fillRect(
        60,
        310,
        mapData.width - 120,
        100
    );

    /*
     * Jalan vertikal.
     */

    const verticalRoads = [
        300,
        560,
        830
    ];

    verticalRoads.forEach((x) => {
        ctx.fillRect(
            x,
            80,
            80,
            mapData.height - 160
        );
    });

    /*
     * Garis jalan.
     */

    ctx.strokeStyle =
        "#D5DEE7";

    ctx.lineWidth = 3;

    ctx.setLineDash([
        12,
        12
    ]);

    ctx.beginPath();

    ctx.moveTo(
        60,
        360
    );

    ctx.lineTo(
        mapData.width - 60,
        360
    );

    ctx.stroke();

    ctx.setLineDash([]);

    /*
     * Area start.
     */

    drawStartArea(ctx);

    /*
     * Dekorasi kampus ringan.
     */

    drawCampusDecorations(ctx);
}

function drawStartArea(ctx) {
    ctx.save();

    ctx.fillStyle =
        "rgba(11,79,156,0.12)";

    ctx.beginPath();

    ctx.arc(
        mapData.start.x,
        mapData.start.y,
        80,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        GAME_CONFIG.colors.navy;

    ctx.font =
        "700 18px Arial, sans-serif";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "START",
        mapData.start.x,
        mapData.start.y - 92
    );

    ctx.restore();
}

function drawCampusDecorations(ctx) {
    const trees = [
        [110, 120],
        [210, 610],
        [470, 110],
        [750, 110],
        [1030, 120],
        [1080, 600],
        [440, 620],
        [760, 620]
    ];

    trees.forEach(
        ([x, y]) => drawTree(
            ctx,
            x,
            y
        )
    );

    const benches = [
        [220, 275],
        [1010, 275],
        [220, 450],
        [1010, 450]
    ];

    benches.forEach(
        ([x, y]) => drawBench(
            ctx,
            x,
            y
        )
    );

    /*
     * Central educational plaza.
     */

    ctx.fillStyle =
        "rgba(23,59,99,0.08)";

    ctx.beginPath();

    ctx.roundRect(
        470,
        300,
        340,
        120,
        18
    );

    ctx.fill();

    ctx.fillStyle =
        GAME_CONFIG.colors.navy;

    ctx.font =
        "700 16px Arial, sans-serif";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "PUSAT PEMBELAJARAN",
        640,
        365
    );
}

function drawTree(ctx, x, y) {
    ctx.save();

    ctx.fillStyle =
        "#8A6A48";

    ctx.fillRect(
        x - 5,
        y + 12,
        10,
        30
    );

    ctx.fillStyle =
        "#4F8A54";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        27,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        "#6BAA65";

    ctx.beginPath();

    ctx.arc(
        x - 12,
        y - 8,
        16,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}

function drawBench(ctx, x, y) {
    ctx.save();

    ctx.fillStyle =
        "#7B624A";

    ctx.fillRect(
        x - 30,
        y,
        60,
        8
    );

    ctx.fillRect(
        x - 26,
        y + 18,
        6,
        22
    );

    ctx.fillRect(
        x + 20,
        y + 18,
        6,
        22
    );

    ctx.restore();
}


/* =========================================================
   31. MATERIAL OBJECTS
   ========================================================= */

function drawMaterials(ctx) {
    mapData.materials.forEach(
        (material) => {
            const completed =
                isMaterialCompleted(
                    material.id
                );

            const nearby =
                gameState.currentNearbyMaterial &&
                gameState.currentNearbyMaterial.id ===
                    material.id;

            drawMaterialObject(
                ctx,
                material,
                completed,
                nearby
            );
        }
    );
}

function drawMaterialObject(
    ctx,
    material,
    completed,
    nearby
) {
    ctx.save();

    const pulse =
        Math.sin(
            performance.now() / 350
        ) * 3;

    if (nearby) {
        ctx.fillStyle =
            completed
                ? "rgba(46,139,87,0.16)"
                : "rgba(244,197,66,0.20)";

        ctx.beginPath();

        ctx.arc(
            material.x,
            material.y,
            55 + pulse,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    /*
     * Papan materi.
     */

    ctx.fillStyle =
        completed
            ? GAME_CONFIG.colors.green
            : material.color;

    ctx.beginPath();

    ctx.roundRect(
        material.x - 30,
        material.y - 38,
        60,
        50,
        10
    );

    ctx.fill();

    /*
     * Tiang.
     */

    ctx.fillStyle =
        "#6F5A43";

    ctx.fillRect(
        material.x - 4,
        material.y + 12,
        8,
        30
    );

    /*
     * Nomor materi.
     */

    ctx.fillStyle =
        completed
            ? GAME_CONFIG.colors.white
            : GAME_CONFIG.colors.navy;

    ctx.font =
        "800 22px Arial, sans-serif";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillText(
        material.icon,
        material.x,
        material.y - 13
    );

    /*
     * Label.
     */

    ctx.fillStyle =
        GAME_CONFIG.colors.navy;

    ctx.font =
        "700 13px Arial, sans-serif";

    ctx.textBaseline =
        "alphabetic";

    ctx.fillText(
        `Materi ${material.id}`,
        material.x,
        material.y + 62
    );

    if (completed) {
        ctx.fillStyle =
            GAME_CONFIG.colors.green;

        ctx.font =
            "700 12px Arial, sans-serif";

        ctx.fillText(
            "✓ Selesai",
            material.x,
            material.y + 78
        );
    }

    ctx.restore();
}


/* =========================================================
   32. FINISH OBJECT
   ========================================================= */

function drawFinish(ctx) {
    const finish =
        mapData.finish;

    ctx.save();

    const unlocked =
        gameState.finishUnlocked;

    ctx.fillStyle =
        unlocked
            ? "rgba(244,197,66,0.22)"
            : "rgba(23,59,99,0.12)";

    ctx.beginPath();

    ctx.roundRect(
        finish.x -
            finish.width / 2 -
            18,
        finish.y -
            finish.height / 2 -
            18,
        finish.width + 36,
        finish.height + 36,
        20
    );

    ctx.fill();

    /*
     * Gerbang.
     */

    ctx.fillStyle =
        unlocked
            ? GAME_CONFIG.colors.yellow
            : "#AEB8C2";

    ctx.beginPath();

    ctx.roundRect(
        finish.x -
            finish.width / 2,
        finish.y -
            finish.height / 2,
        finish.width,
        finish.height,
        14
    );

    ctx.fill();

    ctx.fillStyle =
        GAME_CONFIG.colors.navy;

    ctx.font =
        "800 17px Arial, sans-serif";

    ctx.textAlign =
        "center";

    ctx.fillText(
        unlocked
            ? "FINISH"
            : "TERKUNCI",
        finish.x,
        finish.y - 8
    );

    ctx.font =
        "600 12px Arial, sans-serif";

    ctx.fillText(
        unlocked
            ? "Menuju Quizizz"
            : "Selesaikan 6 materi",
        finish.x,
        finish.y + 16
    );

    ctx.restore();
}


/* =========================================================
   33. PLAYER RENDER
   ========================================================= */

function drawPlayer(ctx) {
    const player =
        gameState.player;

    ctx.save();

    /*
     * Shadow.
     */

    ctx.fillStyle =
        "rgba(23,59,99,0.20)";

    ctx.beginPath();

    ctx.ellipse(
        player.x,
        player.y + 32,
        28,
        9,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
     * Player avatar.
     */

    const image =
        gameState.avatarImage;

    if (
        image &&
        image.complete &&
        image.naturalWidth > 0
    ) {
        const size =
            GAME_CONFIG.player.size;

        ctx.drawImage(
            image,
            player.x - size / 2,
            player.y - size / 2,
            size,
            size
        );
    } else {
        drawFallbackPlayer(
            ctx,
            player.x,
            player.y
        );
    }

    /*
     * Nama pemain.
     */

    drawPlayerName(
        ctx,
        player.x,
        player.y - 54
    );

    ctx.restore();
}

function drawFallbackPlayer(
    ctx,
    x,
    y
) {
    ctx.fillStyle =
        GAME_CONFIG.colors.blue;

    ctx.beginPath();

    ctx.arc(
        x,
        y - 12,
        16,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        GAME_CONFIG.colors.yellow;

    ctx.beginPath();

    ctx.roundRect(
        x - 19,
        y + 4,
        38,
        30,
        10
    );

    ctx.fill();

    ctx.strokeStyle =
        GAME_CONFIG.colors.navy;

    ctx.lineWidth = 2;

    ctx.stroke();
}

function drawPlayerName(
    ctx,
    x,
    y
) {
    const name =
        gameState.playerName ||
        "Pemain";

    ctx.font =
        "700 12px Arial, sans-serif";

    const metrics =
        ctx.measureText(name);

    const paddingX = 8;
    const paddingY = 5;

    const width =
        metrics.width +
        paddingX * 2;

    const height =
        20;

    ctx.fillStyle =
        "rgba(23,59,99,0.92)";

    ctx.beginPath();

    ctx.roundRect(
        x - width / 2,
        y - height / 2,
        width,
        height,
        8
    );

    ctx.fill();

    ctx.fillStyle =
        GAME_CONFIG.colors.white;

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillText(
        name,
        x,
        y
    );
}


/* =========================================================
   34. GAME STOP
   ========================================================= */

function stopGame() {
    gameState.gameRunning = false;
    gameState.gameStarted = false;

    cancelAnimationFrame(
        gameState.animationFrame
    );

    gameState.animationFrame = null;

    gameState.keys.up = false;
    gameState.keys.down = false;
    gameState.keys.left = false;
    gameState.keys.right = false;
    gameState.keys.interact = false;
}


/* =========================================================
   35. UTILITY FUNCTIONS
   ========================================================= */

function distanceBetween(
    x1,
    y1,
    x2,
    y2
) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}

function clamp(
    value,
    min,
    max
) {
    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );
}


/* =========================================================
   36. RESPONSIVE CROP RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {
        if (
            DOM.cropModal &&
            !DOM.cropModal.hidden &&
            gameState.crop.image
        ) {
            renderCrop();
        }
    }
);


/* =========================================================
   37. ACCESSIBILITY — ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key !== "Escape") {
            return;
        }

        if (
            DOM.materialModal &&
            !DOM.materialModal.hidden
        ) {
            closeMaterialModal();
            return;
        }

        if (
            DOM.helpModal &&
            !DOM.helpModal.hidden
        ) {
            closeHelpModal();
            return;
        }

        if (
            DOM.cropModal &&
            !DOM.cropModal.hidden
        ) {
            cancelCrop();
            return;
        }

        if (
            DOM.finishModal &&
            !DOM.finishModal.hidden
        ) {
            closeFinishModal();
        }
    }
);


/* =========================================================
   38. PROTEKSI ERROR GLOBAL
   ========================================================= */

window.addEventListener(
    "error",
    (event) => {
        console.error(
            "Game error:",
            event.error || event.message
        );

        /*
         * Error pada satu komponen tidak sengaja
         * menghentikan seluruh halaman.
         */
    }
);

window.addEventListener(
    "unhandledrejection",
    (event) => {
        console.error(
            "Unhandled game promise:",
            event.reason
        );
    }
);


/* =========================================================
   39. DEBUG API
   =========================================================
   Tidak diperlukan untuk gameplay, tetapi berguna ketika
   melakukan presentasi atau pengembangan.
   ========================================================= */

window.PancasilaGame = {
    state: gameState,
    materials,

    start() {
        startGame();
    },

    stop() {
        stopGame();
    },

    resetProgress() {
        gameState.materialsCompleted =
            new Set();

        gameState.finishUnlocked =
            false;

        updateProgress();
    }
};
