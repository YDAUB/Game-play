"use strict";

/* =========================================================
   PANCASILA EXPLORER
   Main Game Engine - Vanilla JavaScript
   ========================================================= */

/* =========================================================
   CONFIGURATION
   ========================================================= */

const QUIZIZZ_URL = "ISI_LINK_QUIZIZZ_DI_SINI";

const ASSET_PATH = "assets/";

const CHARACTER_ASSETS = {
    karakter1: `${ASSET_PATH}karakter1.png`,
    karakter2: `${ASSET_PATH}karakter2.png`,
    karakter3: `${ASSET_PATH}karakter3.png`
};

const STORAGE_KEY = "pancasilaExplorerSave";

const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1600;

const PLAYER_DEFAULT_SPEED = 260;
const CAMERA_SMOOTHING = 0.085;

const INTERACTION_DISTANCE = 120;
const MATERIAL_INTERACTION_DISTANCE = 145;
const PORTAL_INTERACTION_DISTANCE = 170;

const MAX_AVATAR_FILE_SIZE = 10 * 1024 * 1024;

const MATERIAL_DATA = [
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
   GAME STATE
   ========================================================= */

const gameState = {
    player: {
        name: "",
        x: 360,
        y: 360,
        targetX: 360,
        targetY: 360,
        speed: PLAYER_DEFAULT_SPEED,
        avatar: CHARACTER_ASSETS.karakter1,
        characterId: "karakter1",
        customAvatar: false,
        moving: false
    },

    camera: {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        userControlled: false
    },

    materials: MATERIAL_DATA.map((material, index) => ({
        ...material,
        x: [
            420,
            870,
            1320,
            1800,
            670,
            1550
        ][index],
        y: [
            350,
            650,
            330,
            720,
            1120,
            1130
        ][index],
        status: index === 0 ? "available" : "locked",
        completed: false
    })),

    portal: {
        x: 2070,
        y: 1220,
        unlocked: false
    },

    gameStarted: false,
    currentMaterial: null,
    activeInteraction: null,
    notificationTimer: null,

    avatarEditor: {
        file: null,
        objectUrl: null,
        sourceType: null,
        imageWidth: 0,
        imageHeight: 0,
        offsetX: 0,
        offsetY: 0,
        zoom: 1,
        dragging: false,
        dragStartX: 0,
        dragStartY: 0,
        startOffsetX: 0,
        startOffsetY: 0
    },

    input: {
        pointerDown: false,
        draggingCamera: false,
        dragStartX: 0,
        dragStartY: 0,
        cameraStartX: 0,
        cameraStartY: 0,
        lastPointerX: 0,
        lastPointerY: 0,
        movedDistance: 0
    }
};


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const DOM = {};

function cacheDOM() {
    DOM.gameContainer = document.getElementById("game-container");

    DOM.startScreen = document.getElementById("start-screen");
    DOM.characterForm = document.getElementById("character-form");
    DOM.playerNameInput = document.getElementById("player-name");

    DOM.characterOptions = document.getElementById("character-options");
    DOM.characterInputs = document.querySelectorAll(
        'input[name="character"]'
    );

    DOM.avatarUpload = document.getElementById("avatar-upload");
    DOM.avatarEditor = document.getElementById("avatar-editor");
    DOM.cropStage = document.getElementById("crop-stage");
    DOM.cropImage = document.getElementById("crop-image");
    DOM.cropZoom = document.getElementById("crop-zoom");
    DOM.cropApply = document.getElementById("crop-apply");

    DOM.startGameButton = document.getElementById("start-game-button");

    DOM.gameScreen = document.getElementById("game-screen");
    DOM.gameHud = document.getElementById("game-hud");
    DOM.gameViewport = document.getElementById("game-viewport");
    DOM.gameWorld = document.getElementById("game-world");

    DOM.player = document.getElementById("player");
    DOM.playerNameTag = document.getElementById("player-name-tag");
    DOM.playerAvatarImage = document.getElementById("player-avatar-image");

    DOM.progressElements = document.querySelectorAll(
        "[data-progress], #progress-count, #learning-progress"
    );

    DOM.materialMenuButtons = document.querySelectorAll(
        "[data-material-menu], #materials-button, .materials-button"
    );

    DOM.helpButtons = document.querySelectorAll(
        "[data-help], #help-button, .help-button"
    );

    DOM.resetButtons = document.querySelectorAll(
        "[data-reset], #reset-game-button, .reset-game-button"
    );

    DOM.materialPoints = Array.from(
        document.querySelectorAll(".material-point")
    );

    DOM.portal = document.getElementById("quizizz-portal");

    DOM.notification = document.getElementById("notification");

    DOM.materialModal =
        document.getElementById("material-modal") ||
        document.querySelector(".material-modal");

    DOM.materialTitle =
        document.getElementById("material-title") ||
        document.querySelector(".material-modal-title");

    DOM.materialSummary =
        document.getElementById("material-summary") ||
        document.querySelector(".material-modal-summary");

    DOM.materialPointsContent =
        document.getElementById("material-points") ||
        document.querySelector(".material-points-content");

    DOM.materialNumber =
        document.getElementById("material-number") ||
        document.querySelector(".material-modal-number");

    DOM.materialCompleteButton =
        document.getElementById("complete-material-button") ||
        document.getElementById("material-complete-button") ||
        document.querySelector("[data-action='complete-material']");

    DOM.materialCloseButton =
        document.getElementById("close-material-button") ||
        document.querySelector("[data-action='close-material']");

    DOM.materialReadButton =
        document.getElementById("read-material-button") ||
        document.querySelector("[data-action='read-material']");

    DOM.interactionPrompt =
        document.getElementById("interaction-prompt") ||
        document.querySelector(".interaction-prompt");

    DOM.portalModal =
        document.getElementById("portal-modal") ||
        document.querySelector(".portal-modal");

    DOM.quizizzButton =
        document.getElementById("quizizz-button") ||
        document.querySelector("[data-action='quizizz']");

    DOM.closePortalButton =
        document.getElementById("close-portal-button") ||
        document.querySelector("[data-action='close-portal']");

    DOM.cameraButtons = document.querySelectorAll(
        "[data-camera], .camera-control"
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
    cacheDOM();

    setupWorldSize();
    setupMaterialPoints();
    setupPortal();
    initCharacterSelection();
    initCustomAvatar();
    setupMaterialModal();
    setupPortalModal();
    setupCameraControls();
    setupWorldMovement();
    setupUIButtons();

    loadGame();

    updatePlayerDOM();
    updateProgress();
    updateMaterialVisuals();
    updatePortalVisual();

    if (gameState.gameStarted) {
        showGameScreen();
    } else {
        showStartScreen();
    }

    gameLoop();
}


/* =========================================================
   WORLD SETUP
   ========================================================= */

function setupWorldSize() {
    if (!DOM.gameWorld) return;

    DOM.gameWorld.style.width = `${WORLD_WIDTH}px`;
    DOM.gameWorld.style.height = `${WORLD_HEIGHT}px`;
}

function setupMaterialPoints() {
    DOM.materialPoints.forEach((element, index) => {
        const materialId =
            Number(element.dataset.materialId) ||
            Number(element.dataset.id) ||
            index + 1;

        const material = gameState.materials.find(
            item => item.id === materialId
        );

        if (!material) return;

        element.dataset.materialId = String(material.id);

        element.style.left = `${material.x}px`;
        element.style.top = `${material.y}px`;

        element.setAttribute(
            "aria-label",
            `Materi ${material.id}: ${material.title}`
        );

        element.addEventListener("click", event => {
            event.stopPropagation();

            if (gameState.input.draggingCamera) return;

            movePlayerTo(material.x, material.y, {
                interaction: "material",
                materialId: material.id
            });
        });
    });
}


/* =========================================================
   CHARACTER SELECTION
   ========================================================= */

function initCharacterSelection() {
    if (!DOM.characterInputs.length) return;

    DOM.characterInputs.forEach(input => {
        input.addEventListener("change", () => {
            if (!input.checked) return;

            const characterId =
                input.dataset.character ||
                input.value ||
                "karakter1";

            selectCharacter(characterId);
        });
    });

    const checked =
        document.querySelector('input[name="character"]:checked') ||
        DOM.characterInputs[0];

    if (checked) {
        checked.checked = true;

        selectCharacter(
            checked.dataset.character ||
            checked.value ||
            "karakter1"
        );
    }

    if (DOM.startGameButton) {
        DOM.startGameButton.addEventListener("click", event => {
            event.preventDefault();
            startGame();
        });
    }

    if (DOM.characterForm) {
        DOM.characterForm.addEventListener("submit", event => {
            event.preventDefault();
            startGame();
        });
    }
}

function selectCharacter(characterId) {
    const asset = CHARACTER_ASSETS[characterId];

    if (!asset) return;

    gameState.player.characterId = characterId;
    gameState.player.avatar = asset;
    gameState.player.customAvatar = false;

    DOM.characterInputs.forEach(input => {
        const id =
            input.dataset.character ||
            input.value;

        input.checked = id === characterId;
    });

    document
        .querySelectorAll(
            "[data-character-card], .character-card"
        )
        .forEach(card => {
            const id =
                card.dataset.character ||
                card.dataset.characterId;

            card.classList.toggle(
                "selected",
                id === characterId
            );
        });

    updateCharacterPreview();
}

function updateCharacterPreview() {
    const previews = document.querySelectorAll(
        "[data-character-preview], #selected-character-preview"
    );

    previews.forEach(preview => {
        preview.src = gameState.player.avatar;
    });
}


/* =========================================================
   CUSTOM AVATAR
   ========================================================= */

function initCustomAvatar() {
    if (!DOM.avatarUpload) return;

    DOM.avatarUpload.addEventListener(
        "change",
        handleAvatarUpload
    );

    if (DOM.cropZoom) {
        DOM.cropZoom.addEventListener("input", () => {
            gameState.avatarEditor.zoom =
                Number(DOM.cropZoom.value) || 1;

            updateCropPreview();
        });
    }

    if (DOM.cropApply) {
        DOM.cropApply.addEventListener("click", event => {
            event.preventDefault();
            applyAvatarCrop();
        });
    }

    setupCropper();

    const dropZones = document.querySelectorAll(
        "[data-avatar-drop], .avatar-upload-area, .upload-avatar"
    );

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", event => {
            event.preventDefault();
            zone.classList.add("drag-over");
        });

        zone.addEventListener("dragleave", () => {
            zone.classList.remove("drag-over");
        });

        zone.addEventListener("drop", event => {
            event.preventDefault();
            zone.classList.remove("drag-over");

            const file = event.dataTransfer.files?.[0];

            if (file) {
                processAvatarFile(file);
            }
        });
    });
}

function handleAvatarUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    processAvatarFile(file);
}

function processAvatarFile(file) {
    const acceptedTypes = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp"
    ];

    const fileExtension = file.name
        .split(".")
        .pop()
        .toLowerCase();

    const extensionAllowed = [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp"
    ].includes(fileExtension);

    if (
        !acceptedTypes.includes(file.type) &&
        !extensionAllowed
    ) {
        showNotification(
            "Format avatar tidak valid. Gunakan PNG, JPG/JPEG, GIF, atau WEBP."
        );
        return;
    }

    if (file.size > MAX_AVATAR_FILE_SIZE) {
        showNotification(
            "Ukuran avatar terlalu besar. Maksimal 10 MB."
        );
        return;
    }

    gameState.avatarEditor.file = file;

    const isGIF =
        file.type === "image/gif" ||
        fileExtension === "gif";

    gameState.avatarEditor.sourceType = isGIF
        ? "gif"
        : fileExtension;

    const objectUrl = URL.createObjectURL(file);

    if (gameState.avatarEditor.objectUrl) {
        URL.revokeObjectURL(
            gameState.avatarEditor.objectUrl
        );
    }

    gameState.avatarEditor.objectUrl = objectUrl;

    if (isGIF) {
        /*
         * Animated GIF is intentionally kept as an image URL.
         * Canvas cropping is skipped because drawing a GIF onto
         * canvas would normally reduce it to a static frame.
         */
        gameState.player.avatar = objectUrl;
        gameState.player.customAvatar = true;

        if (DOM.cropImage) {
            DOM.cropImage.src = objectUrl;
        }

        if (DOM.avatarEditor) {
            DOM.avatarEditor.classList.add("gif-preview");
            DOM.avatarEditor.classList.add("active");
        }

        showNotification(
            "GIF dipertahankan sebagai avatar animasi."
        );

        updateCharacterPreview();
        return;
    }

    gameState.avatarEditor.zoom = 1;
    gameState.avatarEditor.offsetX = 0;
    gameState.avatarEditor.offsetY = 0;

    if (DOM.cropZoom) {
        DOM.cropZoom.value = "1";
    }

    const image = new Image();

    image.onload = () => {
        gameState.avatarEditor.imageWidth =
            image.naturalWidth;

        gameState.avatarEditor.imageHeight =
            image.naturalHeight;

        if (DOM.cropImage) {
            DOM.cropImage.src = objectUrl;
        }

        if (DOM.avatarEditor) {
            DOM.avatarEditor.classList.remove(
                "gif-preview"
            );

            DOM.avatarEditor.classList.add("active");
        }

        updateCropPreview();
    };

    image.onerror = () => {
        showNotification(
            "Avatar tidak dapat dibaca oleh browser."
        );
    };

    image.src = objectUrl;
}

function setupCropper() {
    if (!DOM.cropStage) return;

    DOM.cropStage.addEventListener(
        "pointerdown",
        event => {
            if (
                gameState.avatarEditor.sourceType === "gif"
            ) {
                return;
            }

            gameState.avatarEditor.dragging = true;

            gameState.avatarEditor.dragStartX =
                event.clientX;

            gameState.avatarEditor.dragStartY =
                event.clientY;

            gameState.avatarEditor.startOffsetX =
                gameState.avatarEditor.offsetX;

            gameState.avatarEditor.startOffsetY =
                gameState.avatarEditor.offsetY;

            DOM.cropStage.setPointerCapture?.(
                event.pointerId
            );
        }
    );

    DOM.cropStage.addEventListener(
        "pointermove",
        event => {
            if (
                !gameState.avatarEditor.dragging ||
                gameState.avatarEditor.sourceType === "gif"
            ) {
                return;
            }

            const dx =
                event.clientX -
                gameState.avatarEditor.dragStartX;

            const dy =
                event.clientY -
                gameState.avatarEditor.dragStartY;

            gameState.avatarEditor.offsetX =
                gameState.avatarEditor.startOffsetX + dx;

            gameState.avatarEditor.offsetY =
                gameState.avatarEditor.startOffsetY + dy;

            updateCropPreview();
        }
    );

    const stopDragging = () => {
        gameState.avatarEditor.dragging = false;
    };

    DOM.cropStage.addEventListener(
        "pointerup",
        stopDragging
    );

    DOM.cropStage.addEventListener(
        "pointercancel",
        stopDragging
    );

    DOM.cropStage.addEventListener(
        "pointerleave",
        event => {
            if (
                gameState.avatarEditor.dragging &&
                event.buttons === 0
            ) {
                stopDragging();
            }
        }
    );
}

function updateCropPreview() {
    if (!DOM.cropImage) return;

    if (
        gameState.avatarEditor.sourceType === "gif"
    ) {
        DOM.cropImage.style.transform = "none";
        return;
    }

    const zoom = gameState.avatarEditor.zoom || 1;

    DOM.cropImage.style.transform =
        `translate(calc(-50% + ${gameState.avatarEditor.offsetX}px), ` +
        `calc(-50% + ${gameState.avatarEditor.offsetY}px)) ` +
        `scale(${zoom})`;

    DOM.cropImage.style.transformOrigin = "center center";
}

function applyAvatarCrop() {
    const file = gameState.avatarEditor.file;

    if (!file) {
        showNotification("Pilih avatar terlebih dahulu.");
        return;
    }

    if (
        gameState.avatarEditor.sourceType === "gif"
    ) {
        /*
         * Preserve animated GIF rather than destroying animation.
         */
        gameState.player.avatar =
            gameState.avatarEditor.objectUrl;

        gameState.player.customAvatar = true;

        updateCharacterPreview();

        showNotification(
            "Avatar GIF digunakan tanpa mengubah animasinya."
        );

        return;
    }

    if (!DOM.cropImage) return;

    const source = DOM.cropImage;

    if (
        !source.naturalWidth ||
        !source.naturalHeight
    ) {
        showNotification(
            "Tunggu hingga avatar selesai dimuat."
        );
        return;
    }

    const cropSize = 512;

    const canvas = document.createElement("canvas");

    canvas.width = cropSize;
    canvas.height = cropSize;

    const context = canvas.getContext("2d");

    if (!context) {
        showNotification(
            "Browser tidak mendukung pemrosesan avatar."
        );
        return;
    }

    /*
     * Canvas default transparency is preserved.
     * No background is painted.
     */
    context.clearRect(
        0,
        0,
        cropSize,
        cropSize
    );

    const stageRect =
        DOM.cropStage?.getBoundingClientRect();

    const stageSize =
        stageRect?.width || 300;

    const imageRatio =
        source.naturalWidth /
        source.naturalHeight;

    let displayWidth;
    let displayHeight;

    if (imageRatio >= 1) {
        displayHeight = stageSize;
        displayWidth =
            stageSize * imageRatio;
    } else {
        displayWidth = stageSize;
        displayHeight =
            stageSize / imageRatio;
    }

    const zoom =
        gameState.avatarEditor.zoom || 1;

    displayWidth *= zoom;
    displayHeight *= zoom;

    const baseX =
        (stageSize - displayWidth) / 2;

    const baseY =
        (stageSize - displayHeight) / 2;

    const displayedX =
        baseX +
        gameState.avatarEditor.offsetX;

    const displayedY =
        baseY +
        gameState.avatarEditor.offsetY;

    const sourceScale =
        source.naturalWidth /
        displayWidth;

    const sourceX =
        -displayedX *
        sourceScale;

    const sourceY =
        -displayedY *
        sourceScale;

    const sourceSize =
        stageSize *
        sourceScale;

    context.drawImage(
        source,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        cropSize,
        cropSize
    );

    canvas.toBlob(
        blob => {
            if (!blob) {
                showNotification(
                    "Avatar gagal diproses."
                );
                return;
            }

            const croppedUrl =
                URL.createObjectURL(blob);

            if (
                gameState.avatarEditor.objectUrl
            ) {
                URL.revokeObjectURL(
                    gameState.avatarEditor.objectUrl
                );
            }

            gameState.avatarEditor.objectUrl =
                croppedUrl;

            gameState.player.avatar =
                croppedUrl;

            gameState.player.customAvatar =
                true;

            updateCharacterPreview();

            showNotification(
                "Avatar berhasil disesuaikan."
            );
        },
        "image/png",
        0.95
    );
}


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {
    const enteredName =
        DOM.playerNameInput?.value?.trim() || "";

    if (!enteredName) {
        showNotification(
            "Masukkan nama pemain terlebih dahulu."
        );

        DOM.playerNameInput?.focus();
        return;
    }

    gameState.player.name =
        enteredName.slice(0, 40);

    const selectedCharacter =
        document.querySelector(
            'input[name="character"]:checked'
        );

    if (
        selectedCharacter &&
        !gameState.player.customAvatar
    ) {
        const characterId =
            selectedCharacter.dataset.character ||
            selectedCharacter.value ||
            "karakter1";

        selectCharacter(characterId);
    }

    gameState.gameStarted = true;

    saveGame();

    showGameScreen();

    centerCameraOnPlayer(true);

    updatePlayerDOM();
    updateProgress();
    updateMaterialVisuals();
    updatePortalVisual();

    showNotification(
        `Selamat datang, ${gameState.player.name}! Jelajahi map dan pelajari keenam materi.`
    );
}

function showStartScreen() {
    DOM.startScreen?.classList.remove(
        "hidden",
        "is-hidden"
    );

    DOM.gameScreen?.classList.remove(
        "active"
    );

    DOM.gameScreen?.classList.add(
        "hidden"
    );

    if (DOM.playerNameInput) {
        DOM.playerNameInput.value =
            gameState.player.name || "";
    }
}

function showGameScreen() {
    DOM.startScreen?.classList.add("hidden");

    DOM.gameScreen?.classList.remove(
        "hidden",
        "is-hidden"
    );

    DOM.gameScreen?.classList.add(
        "active"
    );
}


/* =========================================================
   PLAYER MOVEMENT
   ========================================================= */

function movePlayerTo(
    x,
    y,
    interaction = null
) {
    if (!gameState.gameStarted) return;

    const bounded = clampWorldPosition(
        x,
        y
    );

    gameState.player.targetX =
        bounded.x;

    gameState.player.targetY =
        bounded.y;

    gameState.player.moving = true;

    gameState.activeInteraction =
        interaction;

    DOM.player?.classList.add("moving");
}

function updatePlayer(deltaTime) {
    const player =
        gameState.player;

    if (!player.moving) return;

    const dx =
        player.targetX - player.x;

    const dy =
        player.targetY - player.y;

    const distance =
        Math.hypot(dx, dy);

    if (
        distance <=
        Math.max(
            3,
            player.speed * deltaTime
        )
    ) {
        player.x =
            player.targetX;

        player.y =
            player.targetY;

        player.moving = false;

        DOM.player?.classList.remove(
            "moving"
        );

        handleMovementArrival();
        return;
    }

    const directionX =
        dx / distance;

    const directionY =
        dy / distance;

    player.x +=
        directionX *
        player.speed *
        deltaTime;

    player.y +=
        directionY *
        player.speed *
        deltaTime;
}

function handleMovementArrival() {
    const interaction =
        gameState.activeInteraction;

    gameState.activeInteraction =
        null;

    if (!interaction) return;

    if (
        interaction.interaction ===
        "material"
    ) {
        const material =
            gameState.materials.find(
                item =>
                    item.id ===
                    interaction.materialId
            );

        if (material) {
            handleMaterialInteraction(
                material
            );
        }

        return;
    }

    if (
        interaction.interaction ===
        "portal"
    ) {
        interactWithPortal();
    }
}

function clampWorldPosition(x, y) {
    const margin = 40;

    return {
        x: Math.max(
            margin,
            Math.min(
                WORLD_WIDTH - margin,
                x
            )
        ),

        y: Math.max(
            margin,
            Math.min(
                WORLD_HEIGHT - margin,
                y
            )
        )
    };
}


/* =========================================================
   CAMERA
   ========================================================= */

function setupCameraControls() {
    if (!DOM.gameViewport) return;

    DOM.gameViewport.addEventListener(
        "pointerdown",
        handleCameraPointerDown
    );

    DOM.gameViewport.addEventListener(
        "pointermove",
        handleCameraPointerMove
    );

    DOM.gameViewport.addEventListener(
        "pointerup",
        handleCameraPointerUp
    );

    DOM.gameViewport.addEventListener(
        "pointercancel",
        handleCameraPointerUp
    );

    DOM.gameViewport.addEventListener(
        "wheel",
        event => {
            if (!gameState.gameStarted) return;

            event.preventDefault();

            gameState.camera.userControlled =
                true;

            gameState.camera.targetX +=
                event.deltaX;

            gameState.camera.targetY +=
                event.deltaY;

            clampCameraTarget();
        },
        { passive: false }
    );

    window.addEventListener(
        "keydown",
        handleKeyboardCamera
    );

    DOM.cameraButtons.forEach(button => {
        button.addEventListener(
            "click",
            event => {
                event.preventDefault();

                const direction =
                    button.dataset.camera;

                moveCameraByDirection(
                    direction
                );
            }
        );
    });
}

function handleCameraPointerDown(event) {
    if (!gameState.gameStarted) return;

    if (
        event.target.closest(
            "button, input, label, a, textarea, select, " +
            ".modal, .material-modal, .portal-modal"
        )
    ) {
        return;
    }

    gameState.input.pointerDown = true;
    gameState.input.draggingCamera = false;

    gameState.input.dragStartX =
        event.clientX;

    gameState.input.dragStartY =
        event.clientY;

    gameState.input.lastPointerX =
        event.clientX;

    gameState.input.lastPointerY =
        event.clientY;

    gameState.input.cameraStartX =
        gameState.camera.targetX;

    gameState.input.cameraStartY =
        gameState.camera.targetY;

    gameState.input.movedDistance = 0;

    DOM.gameViewport.setPointerCapture?.(
        event.pointerId
    );
}

function handleCameraPointerMove(event) {
    if (
        !gameState.input.pointerDown
    ) {
        return;
    }

    const dx =
        event.clientX -
        gameState.input.lastPointerX;

    const dy =
        event.clientY -
        gameState.input.lastPointerY;

    const totalDX =
        event.clientX -
        gameState.input.dragStartX;

    const totalDY =
        event.clientY -
        gameState.input.dragStartY;

    gameState.input.movedDistance =
        Math.hypot(
            totalDX,
            totalDY
        );

    if (
        gameState.input.movedDistance >
        8
    ) {
        gameState.input.draggingCamera =
            true;
    }

    if (
        gameState.input.draggingCamera
    ) {
        gameState.camera.userControlled =
            true;

        gameState.camera.targetX -= dx;
        gameState.camera.targetY -= dy;

        clampCameraTarget();

        DOM.gameViewport.classList.add(
            "camera-dragging"
        );

        event.preventDefault();
    }

    gameState.input.lastPointerX =
        event.clientX;

    gameState.input.lastPointerY =
        event.clientY;
}

function handleCameraPointerUp(event) {
    if (
        !gameState.input.pointerDown
    ) {
        return;
    }

    gameState.input.pointerDown = false;

    DOM.gameViewport?.classList.remove(
        "camera-dragging"
    );

    DOM.gameViewport?.releasePointerCapture?.(
        event.pointerId
    );

    /*
     * A simple click should move the player.
     * A drag should only move the camera.
     */
    if (
        !gameState.input.draggingCamera &&
        gameState.input.movedDistance <= 8
    ) {
        handleWorldClick(event);
    }

    /*
     * Keep the drag state briefly available for
     * the event cycle so UI/material clicks are
     * not confused with camera movement.
     */
    window.setTimeout(() => {
        gameState.input.draggingCamera =
            false;
    }, 0);
}

function handleWorldClick(event) {
    if (!DOM.gameViewport) return;

    if (
        event.target.closest(
            "button, input, label, a, textarea, select, " +
            ".material-point, .quizizz-portal, " +
            ".modal, .material-modal, .portal-modal"
        )
    ) {
        return;
    }

    const rect =
        DOM.gameViewport.getBoundingClientRect();

    const viewportX =
        event.clientX -
        rect.left;

    const viewportY =
        event.clientY -
        rect.top;

    const worldX =
        viewportX -
        gameState.camera.x;

    const worldY =
        viewportY -
        gameState.camera.y;

    movePlayerTo(
        worldX,
        worldY
    );
}

function handleKeyboardCamera(event) {
    if (!gameState.gameStarted) return;

    const key =
        event.key.toLowerCase();

    const keys = [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "w",
        "a",
        "s",
        "d"
    ];

    if (!keys.includes(key)) return;

    const movement = 60;

    if (
        key === "arrowup" ||
        key === "w"
    ) {
        gameState.camera.targetY -=
            movement;
    }

    if (
        key === "arrowdown" ||
        key === "s"
    ) {
        gameState.camera.targetY +=
            movement;
    }

    if (
        key === "arrowleft" ||
        key === "a"
    ) {
        gameState.camera.targetX -=
            movement;
    }

    if (
        key === "arrowright" ||
        key === "d"
    ) {
        gameState.camera.targetX +=
            movement;
    }

    gameState.camera.userControlled =
        true;

    clampCameraTarget();
}

function moveCameraByDirection(
    direction
) {
    const amount = 180;

    switch (direction) {
        case "up":
            gameState.camera.targetY -=
                amount;
            break;

        case "down":
            gameState.camera.targetY +=
                amount;
            break;

        case "left":
            gameState.camera.targetX -=
                amount;
            break;

        case "right":
            gameState.camera.targetX +=
                amount;
            break;

        case "center":
            gameState.camera.userControlled =
                false;

            centerCameraOnPlayer(false);
            return;

        default:
            return;
    }

    gameState.camera.userControlled =
        true;

    clampCameraTarget();
}

function updateCamera() {
    if (!DOM.gameViewport) return;

    /*
     * Automatically follow the player while moving
     * unless the user has deliberately moved the camera.
     */
    if (
        gameState.player.moving &&
        !gameState.camera.userControlled
    ) {
        const viewportWidth =
            DOM.gameViewport.clientWidth;

        const viewportHeight =
            DOM.gameViewport.clientHeight;

        gameState.camera.targetX =
            viewportWidth / 2 -
            gameState.player.x;

        gameState.camera.targetY =
            viewportHeight / 2 -
            gameState.player.y;

        clampCameraTarget();
    }

    gameState.camera.x +=
        (
            gameState.camera.targetX -
            gameState.camera.x
        ) *
        CAMERA_SMOOTHING;

    gameState.camera.y +=
        (
            gameState.camera.targetY -
            gameState.camera.y
        ) *
        CAMERA_SMOOTHING;

    clampCameraCurrent();
}

function centerCameraOnPlayer(
    immediate = false
) {
    if (!DOM.gameViewport) return;

    const viewportWidth =
        DOM.gameViewport.clientWidth;

    const viewportHeight =
        DOM.gameViewport.clientHeight;

    gameState.camera.targetX =
        viewportWidth / 2 -
        gameState.player.x;

    gameState.camera.targetY =
        viewportHeight / 2 -
        gameState.player.y;

    clampCameraTarget();

    if (immediate) {
        gameState.camera.x =
            gameState.camera.targetX;

        gameState.camera.y =
            gameState.camera.targetY;
    }
}

function clampCameraTarget() {
    if (!DOM.gameViewport) return;

    const viewportWidth =
        DOM.gameViewport.clientWidth;

    const viewportHeight =
        DOM.gameViewport.clientHeight;

    const minX =
        Math.min(
            0,
            viewportWidth -
            WORLD_WIDTH
        );

    const maxX = 0;

    const minY =
        Math.min(
            0,
            viewportHeight -
            WORLD_HEIGHT
        );

    const maxY = 0;

    gameState.camera.targetX =
        Math.max(
            minX,
            Math.min(
                maxX,
                gameState.camera.targetX
            )
        );

    gameState.camera.targetY =
        Math.max(
            minY,
            Math.min(
                maxY,
                gameState.camera.targetY
            )
        );
}

function clampCameraCurrent() {
    if (!DOM.gameViewport) return;

    const viewportWidth =
        DOM.gameViewport.clientWidth;

    const viewportHeight =
        DOM.gameViewport.clientHeight;

    const minX =
        Math.min(
            0,
            viewportWidth -
            WORLD_WIDTH
        );

    const maxX = 0;

    const minY =
        Math.min(
            0,
            viewportHeight -
            WORLD_HEIGHT
        );

    const maxY = 0;

    gameState.camera.x =
        Math.max(
            minX,
            Math.min(
                maxX,
                gameState.camera.x
            )
        );

    gameState.camera.y =
        Math.max(
            minY,
            Math.min(
                maxY,
                gameState.camera.y
            )
        );
}


/* =========================================================
   MATERIAL SYSTEM
   ========================================================= */

function handleMaterialInteraction(
    material
) {
    if (!material) return;

    if (material.completed) {
        openMaterial(material.id);
        return;
    }

    if (material.status === "locked") {
        showNotification(
            "Materi ini belum terbuka. Selesaikan materi sebelumnya terlebih dahulu."
        );
        return;
    }

    showInteractionPrompt(
        `Materi ${material.id}: ${material.title}`
    );

    openMaterial(material.id);
}

function openMaterial(materialId) {
    const material =
        gameState.materials.find(
            item => item.id === materialId
        );

    if (!material) return;

    if (
        material.status === "locked" &&
        !material.completed
    ) {
        showNotification(
            "Materi ini masih terkunci."
        );
        return;
    }

    gameState.currentMaterial =
        material.id;

    if (DOM.materialTitle) {
        DOM.materialTitle.textContent =
            material.title;
    }

    if (DOM.materialNumber) {
        DOM.materialNumber.textContent =
            `Materi ${material.id}`;
    }

    if (DOM.materialSummary) {
        DOM.materialSummary.textContent =
            material.summary;
    }

    if (DOM.materialPointsContent) {
        DOM.materialPointsContent.innerHTML =
            "";

        material.points.forEach(
            point => {
                const li =
                    document.createElement("li");

                li.textContent = point;

                DOM.materialPointsContent.appendChild(
                    li
                );
            }
        );
    }

    updateMaterialModalState(
        material
    );

    if (DOM.materialModal) {
        DOM.materialModal.classList.remove(
            "hidden",
            "is-hidden"
        );

        DOM.materialModal.classList.add(
            "active",
            "open"
        );

        DOM.materialModal.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    hideInteractionPrompt();

    DOM.materialCompleteButton?.focus();
}

function updateMaterialModalState(
    material
) {
    if (!DOM.materialCompleteButton) return;

    if (material.completed) {
        DOM.materialCompleteButton.textContent =
            "Materi Sudah Selesai";

        DOM.materialCompleteButton.disabled =
            true;

        DOM.materialCompleteButton.classList.add(
            "completed"
        );

        return;
    }

    DOM.materialCompleteButton.textContent =
        "Selesai";

    DOM.materialCompleteButton.disabled =
        false;

    DOM.materialCompleteButton.classList.remove(
        "completed"
    );
}

function completeMaterial() {
    const materialId =
        gameState.currentMaterial;

    if (!materialId) return;

    const material =
        gameState.materials.find(
            item => item.id === materialId
        );

    if (!material) return;

    if (material.completed) {
        closeMaterialModal();
        return;
    }

    if (material.status === "locked") {
        showNotification(
            "Materi ini belum dapat diselesaikan."
        );
        return;
    }

    material.completed = true;
    material.status = "completed";

    const nextMaterial =
        gameState.materials.find(
            item =>
                item.id === material.id + 1
        );

    if (
        nextMaterial &&
        !nextMaterial.completed
    ) {
        nextMaterial.status =
            "available";
    }

    updateProgress();
    updateMaterialVisuals();

    saveGame();

    closeMaterialModal();

    showNotification(
        `Materi ${material.id} selesai dipelajari!`
    );

    checkPortalUnlock();
}

function closeMaterialModal() {
    if (!DOM.materialModal) return;

    DOM.materialModal.classList.remove(
        "active",
        "open"
    );

    DOM.materialModal.classList.add(
        "hidden"
    );

    DOM.materialModal.setAttribute(
        "aria-hidden",
        "true"
    );

    gameState.currentMaterial =
        null;
}

function setupMaterialModal() {
    if (DOM.materialCompleteButton) {
        DOM.materialCompleteButton.addEventListener(
            "click",
            event => {
                event.preventDefault();
                completeMaterial();
            }
        );
    }

    if (DOM.materialCloseButton) {
        DOM.materialCloseButton.addEventListener(
            "click",
            event => {
                event.preventDefault();
                closeMaterialModal();
            }
        );
    }

    if (DOM.materialReadButton) {
        DOM.materialReadButton.addEventListener(
            "click",
            event => {
                event.preventDefault();

                const material =
                    gameState.materials.find(
                        item =>
                            item.id ===
                            gameState.currentMaterial
                    );

                if (material) {
                    updateMaterialModalState(
                        material
                    );

                    DOM.materialSummary?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    }

    DOM.materialModal?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                DOM.materialModal
            ) {
                closeMaterialModal();
            }
        }
    );
}

function updateProgress() {
    const completedCount =
        gameState.materials.filter(
            material =>
                material.completed
        ).length;

    DOM.progressElements.forEach(
        element => {
            if (
                element.matches(
                    "input, progress"
                )
            ) {
                if (
                    element.tagName ===
                    "PROGRESS"
                ) {
                    element.value =
                        completedCount;
                    element.max = 6;
                }

                return;
            }

            element.textContent =
                `${completedCount}/6`;
        }
    );

    document
        .querySelectorAll(
            "[data-progress-count]"
        )
        .forEach(element => {
            element.textContent =
                completedCount;
        });

    document
        .querySelectorAll(
            "[data-progress-total]"
        )
        .forEach(element => {
            element.textContent =
                "6";
        });
}

function updateMaterialVisuals() {
    DOM.materialPoints.forEach(
        (element, index) => {
            const materialId =
                Number(
                    element.dataset.materialId
                ) ||
                index + 1;

            const material =
                gameState.materials.find(
                    item =>
                        item.id ===
                        materialId
                );

            if (!material) return;

            element.classList.remove(
                "locked",
                "available",
                "completed"
            );

            element.dataset.status =
                material.status;

            element.classList.add(
                material.status
            );

            element.setAttribute(
                "aria-disabled",
                material.status ===
                    "locked"
                    ? "true"
                    : "false"
            );

            const statusElement =
                element.querySelector(
                    "[data-material-status], " +
                    ".material-status"
                );

            if (statusElement) {
                if (
                    material.status ===
                    "completed"
                ) {
                    statusElement.textContent =
                        "✓ Selesai";
                } else if (
                    material.status ===
                    "available"
                ) {
                    statusElement.textContent =
                        "Tersedia";
                } else {
                    statusElement.textContent =
                        "Terkunci";
                }
            }
        }
    );
}


/* =========================================================
   PORTAL SYSTEM
   ========================================================= */

function setupPortal() {
    if (!DOM.portal) return;

    DOM.portal.style.left =
        `${gameState.portal.x}px`;

    DOM.portal.style.top =
        `${gameState.portal.y}px`;

    DOM.portal.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            if (
                gameState.input.draggingCamera
            ) {
                return;
            }

            const distance =
                getDistance(
                    gameState.player.x,
                    gameState.player.y,
                    gameState.portal.x,
                    gameState.portal.y
                );

            if (
                distance >
                PORTAL_INTERACTION_DISTANCE
            ) {
                movePlayerTo(
                    gameState.portal.x,
                    gameState.portal.y,
                    {
                        interaction:
                            "portal"
                    }
                );

                return;
            }

            interactWithPortal();
        }
    );
}

function checkPortalUnlock() {
    const completedCount =
        gameState.materials.filter(
            material =>
                material.completed
        ).length;

    if (
        completedCount === 6 &&
        !gameState.portal.unlocked
    ) {
        gameState.portal.unlocked =
            true;

        updatePortalVisual();

        saveGame();

        showNotification(
            "Semua materi telah selesai dipelajari. Portal Quizizz telah terbuka!"
        );
    }
}

function updatePortalVisual() {
    if (!DOM.portal) return;

    DOM.portal.classList.toggle(
        "unlocked",
        gameState.portal.unlocked
    );

    DOM.portal.classList.toggle(
        "locked",
        !gameState.portal.unlocked
    );

    DOM.portal.dataset.status =
        gameState.portal.unlocked
            ? "unlocked"
            : "locked";

    const statusElement =
        DOM.portal.querySelector(
            "[data-portal-status], .portal-status"
        );

    if (statusElement) {
        statusElement.textContent =
            gameState.portal.unlocked
                ? "TERBUKA"
                : "TERKUNCI";
    }
}

function interactWithPortal() {
    if (!gameState.portal.unlocked) {
        showNotification(
            "Portal Quizizz masih terkunci. Selesaikan seluruh 6 materi terlebih dahulu."
        );
        return;
    }

    if (
        QUIZIZZ_URL ===
        "ISI_LINK_QUIZIZZ_DI_SINI" ||
        !/^https?:\/\//i.test(
            QUIZIZZ_URL
        )
    ) {
        showNotification(
            "URL Quizizz belum diisi oleh developer."
        );
        return;
    }

    openPortalModal();
}

function setupPortalModal() {
    if (DOM.quizizzButton) {
        DOM.quizizzButton.addEventListener(
            "click",
            event => {
                event.preventDefault();

                if (
                    QUIZIZZ_URL ===
                    "ISI_LINK_QUIZIZZ_DI_SINI" ||
                    !/^https?:\/\//i.test(
                        QUIZIZZ_URL
                    )
                ) {
                    showNotification(
                        "URL Quizizz belum diisi oleh developer."
                    );
                    return;
                }

                window.open(
                    QUIZIZZ_URL,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        );
    }

    if (DOM.closePortalButton) {
        DOM.closePortalButton.addEventListener(
            "click",
            event => {
                event.preventDefault();
                closePortalModal();
            }
        );
    }

    DOM.portalModal?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                DOM.portalModal
            ) {
                closePortalModal();
            }
        }
    );
}

function openPortalModal() {
    if (!DOM.portalModal) {
        /*
         * If the HTML does not contain a portal modal,
         * the interaction remains non-blocking and the
         * configured URL can still be opened.
         */
        if (
            QUIZIZZ_URL !==
                "ISI_LINK_QUIZIZZ_DI_SINI" &&
            /^https?:\/\//i.test(
                QUIZIZZ_URL
            )
        ) {
            window.open(
                QUIZIZZ_URL,
                "_blank",
                "noopener,noreferrer"
            );
        }

        return;
    }

    DOM.portalModal.classList.remove(
        "hidden",
        "is-hidden"
    );

    DOM.portalModal.classList.add(
        "active",
        "open"
    );

    DOM.portalModal.setAttribute(
        "aria-hidden",
        "false"
    );

    DOM.quizizzButton?.focus();
}

function closePortalModal() {
    if (!DOM.portalModal) return;

    DOM.portalModal.classList.remove(
        "active",
        "open"
    );

    DOM.portalModal.classList.add(
        "hidden"
    );

    DOM.portalModal.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   INTERACTION PROMPT
   ========================================================= */

function updateInteractionPrompt() {
    if (!gameState.gameStarted) {
        hideInteractionPrompt();
        return;
    }

    const player =
        gameState.player;

    let nearestMaterial = null;
    let nearestDistance = Infinity;

    gameState.materials.forEach(
        material => {
            if (
                material.status ===
                    "locked" &&
                !material.completed
            ) {
                return;
            }

            const distance =
                getDistance(
                    player.x,
                    player.y,
                    material.x,
                    material.y
                );

            if (
                distance <
                    MATERIAL_INTERACTION_DISTANCE &&
                distance <
                    nearestDistance
            ) {
                nearestDistance =
                    distance;

                nearestMaterial =
                    material;
            }
        }
    );

    if (nearestMaterial) {
        showInteractionPrompt(
            nearestMaterial.completed
                ? `Materi ${nearestMaterial.id} · Buka kembali`
                : `Materi ${nearestMaterial.id} · Baca Materi`
        );
        return;
    }

    const portalDistance =
        getDistance(
            player.x,
            player.y,
            gameState.portal.x,
            gameState.portal.y
        );

    if (
        portalDistance <=
        PORTAL_INTERACTION_DISTANCE
    ) {
        showInteractionPrompt(
            gameState.portal.unlocked
                ? "PORTAL QUIZIZZ · Masuk"
                : "PORTAL QUIZIZZ · Terkunci"
        );
        return;
    }

    hideInteractionPrompt();
}

function showInteractionPrompt(message) {
    if (!DOM.interactionPrompt) return;

    DOM.interactionPrompt.textContent =
        message;

    DOM.interactionPrompt.classList.remove(
        "hidden"
    );

    DOM.interactionPrompt.classList.add(
        "visible",
        "active"
    );
}

function hideInteractionPrompt() {
    if (!DOM.interactionPrompt) return;

    DOM.interactionPrompt.classList.remove(
        "visible",
        "active"
    );

    DOM.interactionPrompt.classList.add(
        "hidden"
    );
}


/* =========================================================
   PLAYER DOM
   ========================================================= */

function updatePlayerDOM() {
    if (!DOM.player) return;

    DOM.player.style.left =
        `${gameState.player.x}px`;

    DOM.player.style.top =
        `${gameState.player.y}px`;

    DOM.playerNameTag &&
        (DOM.playerNameTag.textContent =
            gameState.player.name ||
            "Pemain");

    if (DOM.playerAvatarImage) {
        if (
            DOM.playerAvatarImage.src !==
            new URL(
                gameState.player.avatar,
                window.location.href
            ).href
        ) {
            DOM.playerAvatarImage.src =
                gameState.player.avatar;
        }

        DOM.playerAvatarImage.alt =
            `Avatar ${gameState.player.name || "Pemain"}`;
    }

    DOM.player.classList.toggle(
        "moving",
        gameState.player.moving
    );
}


/* =========================================================
   WORLD / PLAYER DISTANCE
   ========================================================= */

function getDistance(
    x1,
    y1,
    x2,
    y2
) {
    return Math.hypot(
        x2 - x1,
        y2 - y1
    );
}


/* =========================================================
   UI BUTTONS
   ========================================================= */

function setupUIButtons() {
    DOM.materialMenuButtons.forEach(
        button => {
            button.addEventListener(
                "click",
                event => {
                    event.preventDefault();

                    showMaterialsOverview();
                }
            );
        }
    );

    DOM.helpButtons.forEach(
        button => {
            button.addEventListener(
                "click",
                event => {
                    event.preventDefault();

                    showNotification(
                        "Klik area map untuk bergerak. Geser map untuk melihat area lain. Datangi titik materi dan selesaikan keenam materi untuk membuka Portal Quizizz."
                    );
                }
            );
        }
    );

    DOM.resetButtons.forEach(
        button => {
            button.addEventListener(
                "click",
                event => {
                    event.preventDefault();

                    const confirmed =
                        window.confirm(
                            "Mulai dari awal akan menghapus progress pembelajaran. Lanjutkan?"
                        );

                    if (confirmed) {
                        resetGame();
                    }
                }
            );
        }
    );
}

function showMaterialsOverview() {
    const completed =
        gameState.materials.filter(
            item =>
                item.completed
        ).length;

    const current =
        gameState.materials.find(
            item =>
                item.status ===
                "available"
        );

    if (current) {
        showNotification(
            `Progress ${completed}/6. Materi berikutnya: Materi ${current.id} — ${current.title}`
        );
    } else if (completed === 6) {
        showNotification(
            "Progress 6/6. Semua materi telah selesai dipelajari."
        );
    } else {
        showNotification(
            `Progress ${completed}/6. Jelajahi titik materi yang tersedia.`
        );
    }
}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function showNotification(message) {
    if (!DOM.notification) {
        /*
         * The game remains functional even if the optional
         * notification element is missing.
         */
        return;
    }

    window.clearTimeout(
        gameState.notificationTimer
    );

    DOM.notification.textContent =
        message;

    DOM.notification.classList.remove(
        "hidden"
    );

    DOM.notification.classList.add(
        "visible",
        "active"
    );

    DOM.notification.setAttribute(
        "role",
        "status"
    );

    gameState.notificationTimer =
        window.setTimeout(() => {
            DOM.notification.classList.remove(
                "visible",
                "active"
            );

            DOM.notification.classList.add(
                "hidden"
            );
        }, 4200);
}


/* =========================================================
   SAVE / LOAD
   ========================================================= */

function saveGame() {
    try {
        const completedMaterials =
            gameState.materials
                .filter(
                    material =>
                        material.completed
                )
                .map(
                    material =>
                        material.id
                );

        const saveData = {
            player: {
                name:
                    gameState.player.name,

                characterId:
                    gameState.player.characterId,

                avatar:
                    gameState.player.customAvatar
                        ? null
                        : gameState.player.avatar,

                customAvatar:
                    gameState.player.customAvatar,

                x:
                    gameState.player.x,

                y:
                    gameState.player.y
            },

            materials:
                completedMaterials,

            portalUnlocked:
                gameState.portal.unlocked,

            gameStarted:
                gameState.gameStarted
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                saveData
            )
        );
    } catch (error) {
        /*
         * localStorage may be disabled, full, or blocked.
         * The game should continue in memory.
         */
        console.warn(
            "Game progress tidak dapat disimpan.",
            error
        );
    }
}

function loadGame() {
    try {
        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!raw) {
            setInitialMaterialStates();
            return;
        }

        const saved =
            JSON.parse(raw);

        if (
            !saved ||
            typeof saved !==
                "object"
        ) {
            setInitialMaterialStates();
            return;
        }

        const savedPlayer =
            saved.player || {};

        gameState.player.name =
            typeof savedPlayer.name ===
                "string"
                ? savedPlayer.name
                : "";

        gameState.player.x =
            Number.isFinite(
                savedPlayer.x
            )
                ? savedPlayer.x
                : 360;

        gameState.player.y =
            Number.isFinite(
                savedPlayer.y
            )
                ? savedPlayer.y
                : 360;

        gameState.player.targetX =
            gameState.player.x;

        gameState.player.targetY =
            gameState.player.y;

        if (
            savedPlayer.customAvatar &&
            !savedPlayer.avatar
        ) {
            /*
             * Blob/object URLs cannot survive a page refresh.
             * Fall back to the selected built-in character.
             */
            gameState.player.customAvatar =
                false;

            gameState.player.characterId =
                "karakter1";

            gameState.player.avatar =
                CHARACTER_ASSETS.karakter1;
        } else {
            const characterId =
                CHARACTER_ASSETS[
                    savedPlayer.characterId
                ]
                    ? savedPlayer.characterId
                    : "karakter1";

            gameState.player.characterId =
                characterId;

            gameState.player.avatar =
                CHARACTER_ASSETS[
                    characterId
                ];

            gameState.player.customAvatar =
                false;
        }

        const completed =
            Array.isArray(
                saved.materials
            )
                ? saved.materials
                : [];

        gameState.materials.forEach(
            material => {
                material.completed =
                    completed.includes(
                        material.id
                    );
            }
        );

        recalculateMaterialStatuses();

        gameState.portal.unlocked =
            gameState.materials.every(
                material =>
                    material.completed
            );

        if (
            typeof saved.portalUnlocked ===
                "boolean" &&
            saved.portalUnlocked
        ) {
            gameState.portal.unlocked =
                gameState.materials.every(
                    material =>
                        material.completed
                );
        }

        gameState.gameStarted =
            Boolean(
                saved.gameStarted &&
                gameState.player.name
            );
    } catch (error) {
        console.warn(
            "Data penyimpanan game tidak dapat dimuat.",
            error
        );

        setInitialMaterialStates();
    }
}

function recalculateMaterialStatuses() {
    let previousCompleted = true;

    gameState.materials.forEach(
        material => {
            if (material.completed) {
                material.status =
                    "completed";

                previousCompleted =
                    true;

                return;
            }

            if (previousCompleted) {
                material.status =
                    "available";

                previousCompleted =
                    false;
            } else {
                material.status =
                    "locked";
            }
        }
    );
}

function setInitialMaterialStates() {
    gameState.materials.forEach(
        (material, index) => {
            material.completed = false;

            material.status =
                index === 0
                    ? "available"
                    : "locked";
        }
    );

    gameState.portal.unlocked =
        false;
}

function resetGame() {
    try {
        localStorage.removeItem(
            STORAGE_KEY
        );
    } catch (error) {
        console.warn(
            "Progress lokal tidak dapat dihapus.",
            error
        );
    }

    gameState.player.name = "";
    gameState.player.x = 360;
    gameState.player.y = 360;
    gameState.player.targetX = 360;
    gameState.player.targetY = 360;
    gameState.player.moving = false;
    gameState.player.characterId =
        "karakter1";
    gameState.player.avatar =
        CHARACTER_ASSETS.karakter1;
    gameState.player.customAvatar =
        false;

    gameState.camera.x = 0;
    gameState.camera.y = 0;
    gameState.camera.targetX = 0;
    gameState.camera.targetY = 0;
    gameState.camera.userControlled =
        false;

    gameState.currentMaterial =
        null;

    gameState.activeInteraction =
        null;

    gameState.gameStarted =
        false;

    setInitialMaterialStates();

    closeMaterialModal();
    closePortalModal();
    hideInteractionPrompt();

    updateProgress();
    updateMaterialVisuals();
    updatePortalVisual();
    updatePlayerDOM();

    document
        .querySelectorAll(
            'input[name="character"]'
        )
        .forEach(input => {
            input.checked =
                (
                    input.dataset.character ||
                    input.value
                ) === "karakter1";
        });

    if (DOM.playerNameInput) {
        DOM.playerNameInput.value = "";
    }

    selectCharacter("karakter1");

    showStartScreen();

    showNotification(
        "Progress berhasil direset. Permainan dimulai dari awal."
    );
}


/* =========================================================
   GAME LOOP
   ========================================================= */

let lastFrameTime = performance.now();

function gameLoop(currentTime) {
    if (
        typeof currentTime !==
        "number"
    ) {
        currentTime =
            performance.now();
    }

    let deltaTime =
        (currentTime -
            lastFrameTime) /
        1000;

    lastFrameTime =
        currentTime;

    /*
     * Prevent unusually large movement after
     * browser tab switching.
     */
    deltaTime =
        Math.min(
            Math.max(deltaTime, 0),
            0.05
        );

    updatePlayer(deltaTime);
    updateCamera();
    updatePlayerDOM();
    renderWorldTransform();
    updateInteractionPrompt();

    requestAnimationFrame(
        gameLoop
    );
}

function renderWorldTransform() {
    if (!DOM.gameWorld) return;

    DOM.gameWorld.style.transform =
        `translate3d(` +
        `${gameState.camera.x}px, ` +
        `${gameState.camera.y}px, 0)`;
}


/* =========================================================
   WORLD CLICK FALLBACK
   ========================================================= */

function setupWorldMovement() {
    if (!DOM.gameWorld) return;

    DOM.gameWorld.addEventListener(
        "click",
        event => {
            if (
                !gameState.gameStarted ||
                gameState.input.draggingCamera
            ) {
                return;
            }

            if (
                event.target.closest(
                    ".material-point, " +
                    ".quizizz-portal, " +
                    "button, " +
                    "a, " +
                    "input, " +
                    "label, " +
                    ".player"
                )
            ) {
                return;
            }

            /*
             * This fallback handles direct clicks on
             * the world when the viewport event did not
             * receive the event.
             */
            const rect =
                DOM.gameWorld.getBoundingClientRect();

            const worldX =
                event.clientX -
                rect.left;

            const worldY =
                event.clientY -
                rect.top;

            movePlayerTo(
                worldX,
                worldY
            );
        }
    );
}


/* =========================================================
   ACCESSIBILITY / ESCAPE HANDLING
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {
        if (
            event.key !==
            "Escape"
        ) {
            return;
        }

        if (
            DOM.materialModal?.classList.contains(
                "active"
            )
        ) {
            closeMaterialModal();
            return;
        }

        if (
            DOM.portalModal?.classList.contains(
                "active"
            )
        ) {
            closePortalModal();
            return;
        }
    }
);


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {
        clampCameraTarget();
        clampCameraCurrent();

        if (
            gameState.gameStarted &&
            !gameState.camera.userControlled
        ) {
            centerCameraOnPlayer(false);
        }
    }
);


/* =========================================================
   PUBLIC API
   =========================================================
   These functions are intentionally exposed so the HTML
   or future UI additions can interact with the game without
   duplicating core logic.
   ========================================================= */

window.PancasilaExplorer = {
    state: gameState,

    startGame,
    resetGame,

    selectCharacter,
    movePlayerTo,

    openMaterial,
    completeMaterial,

    showNotification,

    interactWithPortal,

    saveGame,
    loadGame,

    centerCameraOnPlayer
};
