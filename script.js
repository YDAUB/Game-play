/* =========================================================
   PANCASILA EDUCATIONAL GAME
   Vanilla JavaScript
========================================================= */

/* =========================================================
   1. CONSTANTS
========================================================= */

const QUIZ_URL = "https://www.youtube.com/watch?v=ChxVn2F9te0";

const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1800;

const PLAYER_SPEED = 260;
const INTERACTION_DISTANCE = 150;

const MAX_AVATAR_SIZE = 10 * 1024 * 1024;

const DEFAULT_PLAYER_NAME = "Pemain";

const STORAGE_KEYS = {
    playerName: "pancasilaGame_playerName",
    character: "pancasilaGame_character",
    completedMaterials: "pancasilaGame_completedMaterials"
};

const CHARACTER_ASSETS = {
    karakter1: "assets/karakter1.png",
    karakter2: "assets/karakter2.png",
    karakter3: "assets/karakter3.png"
};


/* =========================================================
   2. MATERIAL DATA
========================================================= */

const MATERIALS = {
    1: {
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

    2: {
        id: 2,
        title: "Pancasila sebagai Sistem Filsafat",
        summary:
            "Pancasila merupakan sistem filsafat karena kelima silanya saling berhubungan dan menjadi dasar pemikiran kehidupan bangsa.",
        points: [
            "Filsafat = berpikir radikal, sistematis, menyeluruh, dan logis.",
            "Pancasila merupakan sistem yang utuh, bukan kumpulan nilai yang terpisah.",
            "Lima sila memiliki hubungan hierarkis-piramidal dan saling mengisi.",
            "Filsafat Pancasila mencakup: Ontologi → hakikat; Epistemologi → cara memperoleh pengetahuan; Aksiologi → nilai/kegunaan.",
            "Pancasila menjadi pandangan hidup dan pedoman dalam kehidupan sehari-hari.",
            "Nilai Pancasila berasal dari budaya, agama, dan pengalaman sejarah bangsa Indonesia."
        ]
    },

    3: {
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

    4: {
        id: 4,
        title: "Pancasila sebagai Dasar Negara",
        summary:
            "Pancasila merupakan dasar negara, sumber dari segala sumber hukum, dan landasan penyelenggaraan negara.",
        points: [
            "Pancasila menjadi sumber dari segala sumber hukum.",
            "Menjadi cita hukum dan landasan pembangunan nasional.",
            "Pancasila tercantum dalam Pembukaan UUD 1945 Alinea IV.",
            "Hubungan dengan UUD 1945: Formal: tercantum dalam Pembukaan UUD 1945. Material: menjadi isi pokok/fundamental Pembukaan UUD 1945.",
            "Pancasila diterapkan dalam bidang politik, ekonomi, sosial budaya, serta pertahanan dan keamanan.",
            "Kedudukan Pancasila tetap menjadi dasar negara meskipun UUD 1945 mengalami amandemen."
        ]
    },

    5: {
        id: 5,
        title: "Pancasila sebagai Sistem Etika",
        summary:
            "Pancasila sebagai sistem etika menjadi pedoman untuk menentukan baik-buruk dan benar-salah dalam kehidupan bermasyarakat dan bernegara.",
        points: [
            "Etika: pemikiran tentang baik-buruk dan benar-salah.",
            "Moral: nilai dan norma yang menjadi pedoman perilaku.",
            "Etiket: aturan sopan santun.",
            "Hubungan: Etika → Moral → Etiket.",
            "Aliran etika: Hedonisme, Utilitarianisme, Deontologi, Etika kebajikan.",
            "Etika Pancasila menggabungkan nilai religius, kemanusiaan, kebangsaan, demokrasi, dan keadilan.",
            "Pancasila menjadi pedoman menghadapi intoleransi, diskriminasi, konflik, korupsi, dan ketidakadilan."
        ]
    },

    6: {
        id: 6,
        title: "Pancasila dan IPTEK",
        summary:
            "Pancasila menjadi pedoman nilai dan moral agar perkembangan IPTEK tetap berorientasi pada manusia dan kepentingan masyarakat.",
        points: [
            "IPTEK memberikan manfaat sekaligus risiko.",
            "IPTEK membutuhkan nilai karena penggunaannya dipengaruhi kepentingan manusia.",
            "Pancasila sebagai filter IPTEK: Sila 1: sesuai moral. Sila 2: menjaga martabat manusia. Sila 3: memperkuat persatuan. Sila 4: bersifat inklusif. Sila 5: manfaatnya harus adil.",
            "Contoh isu: AI, Big Data, privasi, diskriminasi algoritma, media sosial, dan disinformasi.",
            "Intinya: IPTEK harus memanusiakan manusia, bukan merugikan manusia."
        ]
    }
};


/* =========================================================
   3. DOM REFERENCES
========================================================= */

const DOM = {
    app: document.getElementById("game-app"),

    startScreen: document.getElementById("start-screen"),
    gameScreen: document.getElementById("game-screen"),

    characterOptions: document.getElementById("character-options"),
    avatarUpload: document.getElementById("avatar-upload"),
    avatarCropArea: document.getElementById("avatar-crop-area"),
    avatarCropContainer: document.getElementById("avatar-crop-container"),
    avatarPreview: document.getElementById("avatar-upload-preview"),
    cropZoomOut: document.getElementById("avatar-crop-zoom-out"),
    cropReset: document.getElementById("avatar-crop-reset"),
    cropZoomIn: document.getElementById("avatar-crop-zoom-in"),
    avatarUploadInfo: document.getElementById("avatar-upload-info"),

    playerNameInput: document.getElementById("player-name"),
    startButton: document.getElementById("start-game-button"),

    viewport: document.getElementById("game-viewport"),
    world: document.getElementById("game-world"),

    player: document.getElementById("player"),
    playerAvatar: document.getElementById("player-avatar"),
    playerNameLabel: document.getElementById("player-name-label"),

    hudPlayerName: document.getElementById("hud-player-name"),
    progressCount: document.getElementById("progress-count"),
    menuButton: document.getElementById("menu-button"),

    materialModal: document.getElementById("material-modal"),
    materialModalTitle: document.getElementById("material-modal-title"),
    materialModalNumber: document.getElementById("material-modal-number"),
    materialSummary: document.getElementById("material-summary"),
    materialPoints: document.getElementById("material-points"),
    materialCompleteButton: document.getElementById("material-complete-button"),
    materialCompletionIndicator: document.getElementById(
        "material-completion-indicator"
    ),
    materialModalClose: document.getElementById("material-modal-close"),

    portal: document.getElementById("portal"),
    portalButton: document.getElementById("portal-button"),
    portalDescription: document.getElementById("portal-description"),

    notification: document.getElementById("notification"),
    notificationTitle: document.getElementById("notification-title"),
    notificationMessage: document.getElementById("notification-message"),
    notificationClose: document.getElementById("notification-close"),

    instructionModal: document.getElementById("instruction-modal"),
    instructionModalClose: document.getElementById("instruction-modal-close"),
    instructionUnderstandButton: document.getElementById(
        "instruction-understand-button"
    ),

    menuConfirmationModal: document.getElementById(
        "menu-confirmation-modal"
    ),
    menuConfirmationClose: document.getElementById(
        "menu-confirmation-close"
    ),
    menuCancelButton: document.getElementById("menu-cancel-button"),
    menuConfirmButton: document.getElementById("menu-confirm-button"),

    cameraControls: document.getElementById("camera-controls")
};


/* =========================================================
   4. GAME STATE
========================================================= */

const gameState = {
    selectedCharacter: null,
    playerName: DEFAULT_PLAYER_NAME,
    playerAvatar: null,

    playerX: 1150,
    playerY: 850,

    cameraX: 0,
    cameraY: 0,

    targetX: null,
    targetY: null,

    completedMaterials: [],

    portalUnlocked: false,
    gameStarted: false,

    activeMaterial: null,

    moving: false,

    pointer: {
        active: false,
        dragging: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        totalMovement: 0
    },

    cameraDragStartX: 0,
    cameraDragStartY: 0,

    lastFrameTime: 0,

    notificationTimer: null
};


/* =========================================================
   5. CROP STATE
========================================================= */

const cropState = {
    active: false,
    file: null,
    objectUrl: null,

    isGif: false,

    zoom: 1,
    minZoom: 0.5,
    maxZoom: 3,

    offsetX: 0,
    offsetY: 0,

    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialOffsetX: 0,
    initialOffsetY: 0,

    croppedDataUrl: null
};


/* =========================================================
   6. INITIALIZATION
========================================================= */

function init() {
    if (!validateRequiredDOM()) {
        return;
    }

    loadSavedPreferences();
    createCropConfirmButton();
    bindEventListeners();
    initializeCharacterSelection();
    initializeMaterials();
    initializePortal();
    initializePlayer();
    initializeCropInterface();

    DOM.gameScreen.hidden = true;
    DOM.startScreen.hidden = false;

    showInstructionOnce();
    updateProgress();
    updatePortalVisual();
}

function validateRequiredDOM() {
    const required = [
        DOM.startScreen,
        DOM.gameScreen,
        DOM.characterOptions,
        DOM.avatarUpload,
        DOM.playerNameInput,
        DOM.startButton,
        DOM.viewport,
        DOM.world,
        DOM.player,
        DOM.playerAvatar,
        DOM.playerNameLabel,
        DOM.progressCount,
        DOM.materialModal,
        DOM.materialModalTitle,
        DOM.materialSummary,
        DOM.materialPoints,
        DOM.materialCompleteButton,
        DOM.portal,
        DOM.portalButton,
        DOM.notification
    ];

    const missing = required.filter((element) => !element);

    if (missing.length > 0) {
        console.error(
            "Pancasila Game: elemen HTML yang diperlukan tidak ditemukan."
        );
        return false;
    }

    return true;
}


/* =========================================================
   7. LOCAL STORAGE
========================================================= */

function loadSavedPreferences() {
    try {
        const savedName = localStorage.getItem(STORAGE_KEYS.playerName);
        const savedCharacter = localStorage.getItem(STORAGE_KEYS.character);
        const savedProgress = localStorage.getItem(
            STORAGE_KEYS.completedMaterials
        );

        if (savedName) {
            gameState.playerName = savedName;
            DOM.playerNameInput.value = savedName;
        }

        if (
            savedCharacter &&
            Object.prototype.hasOwnProperty.call(
                CHARACTER_ASSETS,
                savedCharacter
            )
        ) {
            gameState.selectedCharacter = savedCharacter;
        }

        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);

            if (Array.isArray(parsedProgress)) {
                gameState.completedMaterials = parsedProgress
                    .map(Number)
                    .filter((id) => MATERIALS[id])
                    .filter(
                        (id, index, array) =>
                            array.indexOf(id) === index
                    );
            }
        }

        gameState.portalUnlocked =
            gameState.completedMaterials.length === 6;
    } catch (error) {
        console.warn(
            "Pancasila Game: localStorage tidak dapat digunakan.",
            error
        );
    }
}

function saveProgress() {
    try {
        localStorage.setItem(
            STORAGE_KEYS.completedMaterials,
            JSON.stringify(gameState.completedMaterials)
        );
    } catch (error) {
        console.warn(
            "Pancasila Game: progress tidak dapat disimpan.",
            error
        );
    }
}

function savePlayerPreferences() {
    try {
        localStorage.setItem(
            STORAGE_KEYS.playerName,
            gameState.playerName
        );

        if (gameState.selectedCharacter) {
            localStorage.setItem(
                STORAGE_KEYS.character,
                gameState.selectedCharacter
            );
        }
    } catch (error) {
        console.warn(
            "Pancasila Game: preferensi tidak dapat disimpan.",
            error
        );
    }
}


/* =========================================================
   8. CHARACTER SELECTION
========================================================= */

function initializeCharacterSelection() {
    const options = DOM.characterOptions.querySelectorAll(
        "[data-character-id]"
    );

    options.forEach((option) => {
        const characterId = option.dataset.characterId;

        if (characterId === gameState.selectedCharacter) {
            selectCharacter(characterId);
        }

        option.addEventListener("click", () => {
            selectCharacter(characterId);
        });

        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectCharacter(characterId);
            }
        });
    });
}

function selectCharacter(characterId) {
    if (!CHARACTER_ASSETS[characterId]) {
        return;
    }

    gameState.selectedCharacter = characterId;

    const options = DOM.characterOptions.querySelectorAll(
        "[data-character-id]"
    );

    options.forEach((option) => {
        const selected =
            option.dataset.characterId === characterId;

        option.classList.toggle("selected", selected);
        option.setAttribute("aria-selected", String(selected));
    });

    gameState.playerAvatar = CHARACTER_ASSETS[characterId];

    if (!cropState.active) {
        DOM.playerAvatar.src = CHARACTER_ASSETS[characterId];
    }

    savePlayerPreferences();
}


/* =========================================================
   9. CUSTOM AVATAR
========================================================= */

function initializeCropInterface() {
    if (!DOM.avatarPreview) {
        return;
    }

    DOM.cropZoomIn?.addEventListener("click", () => {
        if (!cropState.active || cropState.isGif) {
            return;
        }

        cropState.zoom = Math.min(
            cropState.maxZoom,
            cropState.zoom + 0.1
        );

        renderCropPreview();
    });

    DOM.cropZoomOut?.addEventListener("click", () => {
        if (!cropState.active || cropState.isGif) {
            return;
        }

        cropState.zoom = Math.max(
            cropState.minZoom,
            cropState.zoom - 0.1
        );

        renderCropPreview();
    });

    DOM.cropReset?.addEventListener("click", resetCrop);

    DOM.avatarUpload.addEventListener("change", handleAvatarFile);
}

function createCropConfirmButton() {
    if (!DOM.avatarCropContainer) {
        return;
    }

    const controls = document.getElementById("avatar-crop-controls");

    if (!controls || document.getElementById("avatar-crop-confirm")) {
        return;
    }

    const button = document.createElement("button");

    button.type = "button";
    button.id = "avatar-crop-confirm";
    button.setAttribute("aria-label", "Konfirmasi crop avatar");
    button.textContent = "Gunakan Avatar";

    button.addEventListener("click", confirmAvatarCrop);

    controls.appendChild(button);
}

function handleAvatarFile(event) {
    const file = event.target.files?.[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        showNotification(
            "File Tidak Valid",
            "Silakan pilih file gambar yang didukung browser."
        );

        event.target.value = "";
        return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
        showNotification(
            "File Terlalu Besar",
            "Ukuran avatar maksimal adalah 10 MB."
        );

        event.target.value = "";
        return;
    }

    clearCropObjectUrl();

    cropState.file = file;
    cropState.active = true;
    cropState.isGif =
        file.type === "image/gif" ||
        file.name.toLowerCase().endsWith(".gif");

    cropState.zoom = 1;
    cropState.offsetX = 0;
    cropState.offsetY = 0;
    cropState.croppedDataUrl = null;

    const objectUrl = URL.createObjectURL(file);

    cropState.objectUrl = objectUrl;

    DOM.avatarPreview.src = objectUrl;
    DOM.avatarPreview.hidden = false;

    DOM.avatarPreview.onload = () => {
        if (cropState.isGif) {
            handleGifAvatar();
        } else {
            initializeCropPosition();
            renderCropPreview();
        }
    };
}

function handleGifAvatar() {
    cropState.zoom = 1;
    cropState.offsetX = 0;
    cropState.offsetY = 0;

    DOM.avatarPreview.style.transform =
        "translate(-50%, -50%) scale(1)";

    DOM.avatarUploadInfo.textContent =
        "GIF animasi dipertahankan sebagai GIF asli. Crop animasi memiliki keterbatasan browser sehingga file GIF asli akan digunakan.";

    showNotification(
        "GIF Dipilih",
        "Animasi GIF akan dipertahankan. Browser tidak dapat melakukan crop GIF animasi secara native tanpa merasterisasi animasinya."
    );
}

function initializeCropPosition() {
    const image = DOM.avatarPreview;

    if (!image.naturalWidth || !image.naturalHeight) {
        return;
    }

    const containerWidth =
        DOM.avatarCropContainer.clientWidth;
    const containerHeight =
        DOM.avatarCropContainer.clientHeight;

    const scale = Math.max(
        containerWidth / image.naturalWidth,
        containerHeight / image.naturalHeight
    );

    cropState.minZoom = scale;
    cropState.maxZoom = Math.max(scale * 3, scale + 1);
    cropState.zoom = scale;

    cropState.offsetX = 0;
    cropState.offsetY = 0;

    DOM.avatarUploadInfo.textContent =
        "Geser gambar untuk menentukan posisi crop 1:1. Gunakan tombol + dan − untuk mengatur zoom.";
}

function renderCropPreview() {
    if (!cropState.active || cropState.isGif) {
        return;
    }

    DOM.avatarPreview.style.transform =
        `translate(calc(-50% + ${cropState.offsetX}px), calc(-50% + ${cropState.offsetY}px)) scale(${cropState.zoom})`;
}

function resetCrop() {
    if (!cropState.active) {
        return;
    }

    if (cropState.isGif) {
        cropState.zoom = 1;
        cropState.offsetX = 0;
        cropState.offsetY = 0;

        DOM.avatarPreview.style.transform =
            "translate(-50%, -50%) scale(1)";

        return;
    }

    initializeCropPosition();
    renderCropPreview();
}

function confirmAvatarCrop() {
    if (!cropState.file || !cropState.active) {
        return;
    }

    if (cropState.isGif) {
        gameState.playerAvatar = cropState.objectUrl;

        DOM.playerAvatar.src = cropState.objectUrl;

        showNotification(
            "Avatar Siap",
            "GIF asli digunakan agar animasinya tetap terjaga."
        );

        return;
    }

    createCroppedAvatar()
        .then((dataUrl) => {
            gameState.playerAvatar = dataUrl;
            cropState.croppedDataUrl = dataUrl;

            DOM.playerAvatar.src = dataUrl;

            DOM.avatarUploadInfo.textContent =
                "Avatar berhasil dicrop dan siap digunakan.";

            showNotification(
                "Avatar Siap",
                "Avatar berhasil dicrop dengan rasio 1:1."
            );
        })
        .catch((error) => {
            console.error(
                "Pancasila Game: crop avatar gagal.",
                error
            );

            showNotification(
                "Crop Gagal",
                "Avatar tidak dapat diproses. Silakan coba gambar lain."
            );
        });
}

function createCroppedAvatar() {
    return new Promise((resolve, reject) => {
        const image = DOM.avatarPreview;

        if (!image.naturalWidth || !image.naturalHeight) {
            reject(new Error("Ukuran gambar tidak tersedia."));
            return;
        }

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            reject(new Error("Canvas tidak didukung browser."));
            return;
        }

        const cropSize = Math.min(
            image.naturalWidth,
            image.naturalHeight
        );

        canvas.width = cropSize;
        canvas.height = cropSize;

        const baseScale = Math.max(
            DOM.avatarCropContainer.clientWidth /
                image.naturalWidth,
            DOM.avatarCropContainer.clientHeight /
                image.naturalHeight
        );

        const effectiveScale =
            baseScale > 0
                ? cropState.zoom / baseScale
                : 1;

        const displayedWidth =
            image.naturalWidth * effectiveScale;

        const displayedHeight =
            image.naturalHeight * effectiveScale;

        const containerWidth =
            DOM.avatarCropContainer.clientWidth;

        const containerHeight =
            DOM.avatarCropContainer.clientHeight;

        const imageLeft =
            (containerWidth - displayedWidth) / 2 +
            cropState.offsetX;

        const imageTop =
            (containerHeight - displayedHeight) / 2 +
            cropState.offsetY;

        const sourceX =
            Math.max(
                0,
                -imageLeft / effectiveScale
            );

        const sourceY =
            Math.max(
                0,
                -imageTop / effectiveScale
            );

        const sourceSize =
            containerWidth / effectiveScale;

        const safeSourceSize = Math.min(
            sourceSize,
            cropSize
        );

        try {
            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            context.drawImage(
                image,
                sourceX,
                sourceY,
                safeSourceSize,
                safeSourceSize,
                0,
                0,
                cropSize,
                cropSize
            );

            resolve(
                canvas.toDataURL(
                    "image/png",
                    0.92
                )
            );
        } catch (error) {
            reject(error);
        }
    });
}

function clearCropObjectUrl() {
    if (cropState.objectUrl) {
        URL.revokeObjectURL(cropState.objectUrl);
        cropState.objectUrl = null;
    }
}

function initializeCropPointerEvents() {
    if (!DOM.avatarCropContainer) {
        return;
    }

    DOM.avatarCropContainer.addEventListener(
        "pointerdown",
        (event) => {
            if (!cropState.active || cropState.isGif) {
                return;
            }

            cropState.dragging = true;
            cropState.dragStartX = event.clientX;
            cropState.dragStartY = event.clientY;
            cropState.initialOffsetX = cropState.offsetX;
            cropState.initialOffsetY = cropState.offsetY;

            DOM.avatarCropContainer.setPointerCapture(
                event.pointerId
            );
        }
    );

    DOM.avatarCropContainer.addEventListener(
        "pointermove",
        (event) => {
            if (!cropState.dragging) {
                return;
            }

            cropState.offsetX =
                cropState.initialOffsetX +
                (event.clientX - cropState.dragStartX);

            cropState.offsetY =
                cropState.initialOffsetY +
                (event.clientY - cropState.dragStartY);

            renderCropPreview();
        }
    );

    const stopDragging = (event) => {
        if (!cropState.dragging) {
            return;
        }

        cropState.dragging = false;

        try {
            DOM.avatarCropContainer.releasePointerCapture(
                event.pointerId
            );
        } catch {
            /* Pointer capture may already be released. */
        }
    };

    DOM.avatarCropContainer.addEventListener(
        "pointerup",
        stopDragging
    );

    DOM.avatarCropContainer.addEventListener(
        "pointercancel",
        stopDragging
    );
}


/* =========================================================
   10. PLAYER INITIALIZATION
========================================================= */

function initializePlayer() {
    DOM.player.style.left = `${gameState.playerX}px`;
    DOM.player.style.top = `${gameState.playerY}px`;

    DOM.playerNameLabel.textContent =
        gameState.playerName;

    if (gameState.selectedCharacter) {
        DOM.playerAvatar.src =
            CHARACTER_ASSETS[
                gameState.selectedCharacter
            ];
    }
}

function preparePlayer() {
    const name =
        DOM.playerNameInput.value.trim() ||
        DEFAULT_PLAYER_NAME;

    gameState.playerName = name;

    DOM.playerNameLabel.textContent =
        gameState.playerName;

    DOM.hudPlayerName.textContent =
        gameState.playerName;

    let avatar = gameState.playerAvatar;

    if (!avatar && gameState.selectedCharacter) {
        avatar =
            CHARACTER_ASSETS[
                gameState.selectedCharacter
            ];
    }

    if (!avatar) {
        avatar = CHARACTER_ASSETS.karakter1;
        gameState.selectedCharacter = "karakter1";
    }

    gameState.playerAvatar = avatar;

    DOM.playerAvatar.src = avatar;

    DOM.player.style.left =
        `${gameState.playerX}px`;

    DOM.player.style.top =
        `${gameState.playerY}px`;

    savePlayerPreferences();
}


/* =========================================================
   11. START GAME
========================================================= */

function startGame() {
    const name =
        DOM.playerNameInput.value.trim();

    if (!gameState.selectedCharacter && !gameState.playerAvatar) {
        showNotification(
            "Pilih Karakter",
            "Silakan pilih salah satu karakter terlebih dahulu."
        );
        return;
    }

    if (!name) {
        DOM.playerNameInput.focus();

        showNotification(
            "Nama Belum Diisi",
            "Masukkan nama pemain sebelum memulai permainan."
        );

        return;
    }

    preparePlayer();

    gameState.gameStarted = true;
    gameState.targetX = null;
    gameState.targetY = null;
    gameState.moving = false;

    DOM.startScreen.hidden = true;
    DOM.gameScreen.hidden = false;

    requestAnimationFrame(() => {
        centerCameraOnPlayer();
        updateProgress();
        updateAllMaterialVisuals();
        updatePortalVisual();

        showNotification(
            "Permainan Dimulai",
            "Klik atau ketuk area map untuk menggerakkan karakter. Jelajahi keenam materi Pancasila."
        );
    });
}


/* =========================================================
   12. MATERIAL INITIALIZATION
========================================================= */

function initializeMaterials() {
    Object.keys(MATERIALS).forEach((id) => {
        const materialElement =
            document.getElementById(`materi-${id}`);

        if (!materialElement) {
            return;
        }

        materialElement.dataset.status =
            isMaterialCompleted(Number(id))
                ? "completed"
                : "locked";

        const button =
            materialElement.querySelector(
                ".material-open-button"
            );

        if (button) {
            button.addEventListener(
                "click",
                (event) => {
                    event.stopPropagation();

                    handleMaterialRequest(
                        Number(id)
                    );
                }
            );
        }

        materialElement.addEventListener(
            "click",
            (event) => {
                if (
                    event.target.closest(
                        ".material-open-button"
                    )
                ) {
                    return;
                }

                handleMaterialRequest(
                    Number(id)
                );
            }
        );
    });

    updateAllMaterialVisuals();
}

function handleMaterialRequest(materialId) {
    if (!gameState.gameStarted) {
        return;
    }

    if (!MATERIALS[materialId]) {
        return;
    }

    if (isMaterialCompleted(materialId)) {
        openMaterial(materialId);
        return;
    }

    const element =
        document.getElementById(
            `materi-${materialId}`
        );

    if (!element) {
        return;
    }

    const position =
        getElementWorldCenter(element);

    const distance =
        distanceBetween(
            gameState.playerX,
            gameState.playerY,
            position.x,
            position.y
        );

    if (distance <= INTERACTION_DISTANCE) {
        openMaterial(materialId);
        return;
    }

    setMovementTarget(
        position.x,
        position.y,
        () => {
            if (
                distanceBetween(
                    gameState.playerX,
                    gameState.playerY,
                    position.x,
                    position.y
                ) <= INTERACTION_DISTANCE + 10
            ) {
                openMaterial(materialId);
            }
        }
    );

    showNotification(
        "Menuju Materi",
        `Karakter sedang menuju Materi ${materialId}.`
    );
}


/* =========================================================
   13. MATERIAL OPEN / COMPLETE
========================================================= */

function openMaterial(materialId) {
    const material = MATERIALS[materialId];

    if (!material) {
        return;
    }

    gameState.activeMaterial = materialId;

    DOM.materialModalNumber.textContent =
        `Materi ${material.id}`;

    DOM.materialModalTitle.textContent =
        material.title;

    DOM.materialSummary.textContent =
        material.summary;

    DOM.materialPoints.replaceChildren();

    material.points.forEach((point) => {
        const listItem =
            document.createElement("li");

        listItem.textContent = point;

        DOM.materialPoints.appendChild(
            listItem
        );
    });

    const completed =
        isMaterialCompleted(materialId);

    DOM.materialCompletionIndicator.textContent =
        completed
            ? "Materi sudah selesai"
            : "Materi belum selesai";

    DOM.materialCompletionIndicator.classList.toggle(
        "completed",
        completed
    );

    DOM.materialCompleteButton.textContent =
        completed
            ? "Selesai"
            : "Tandai Selesai";

    DOM.materialCompleteButton.classList.toggle(
        "completed",
        completed
    );

    DOM.materialCompleteButton.disabled =
        completed;

    DOM.materialModal.hidden = false;

    document.body.style.overflow = "hidden";
}

function completeActiveMaterial() {
    const materialId =
        gameState.activeMaterial;

    if (!materialId) {
        return;
    }

    if (isMaterialCompleted(materialId)) {
        closeMaterialModal();
        return;
    }

    gameState.completedMaterials.push(
        Number(materialId)
    );

    gameState.completedMaterials =
        [...new Set(
            gameState.completedMaterials
                .map(Number)
                .filter((id) => MATERIALS[id])
        )];

    saveProgress();

    updateProgress();
    updateMaterialVisual(materialId);

    showNotification(
        "Materi Selesai",
        `Materi ${materialId} selesai dipelajari.`
    );

    if (
        gameState.completedMaterials.length === 6
    ) {
        unlockPortal();
    }

    closeMaterialModal();
}

function closeMaterialModal() {
    DOM.materialModal.hidden = true;
    gameState.activeMaterial = null;

    if (
        DOM.instructionModal.hidden &&
        DOM.menuConfirmationModal.hidden
    ) {
        document.body.style.overflow = "";
    }
}

function isMaterialCompleted(materialId) {
    return gameState.completedMaterials.includes(
        Number(materialId)
    );
}


/* =========================================================
   14. MATERIAL VISUAL STATE
========================================================= */

function updateAllMaterialVisuals() {
    Object.keys(MATERIALS).forEach((id) => {
        updateMaterialVisual(Number(id));
    });
}

function updateMaterialVisual(materialId) {
    const element =
        document.getElementById(
            `materi-${materialId}`
        );

    if (!element) {
        return;
    }

    const completed =
        isMaterialCompleted(materialId);

    const statusElement =
        element.querySelector(
            ".material-status"
        );

    const button =
        element.querySelector(
            ".material-open-button"
        );

    element.classList.remove(
        "locked",
        "unlocked",
        "completed"
    );

    if (completed) {
        element.classList.add("completed");
        element.dataset.status = "completed";

        if (statusElement) {
            statusElement.textContent =
                "Selesai";
        }

        if (button) {
            button.textContent = "Pelajari Lagi";
        }

        return;
    }

    element.classList.add("unlocked");
    element.dataset.status = "unlocked";

    if (statusElement) {
        statusElement.textContent =
            "Belum selesai";
    }

    if (button) {
        button.textContent = "Buka Materi";
    }
}


/* =========================================================
   15. PROGRESS
========================================================= */

function updateProgress() {
    const completedCount =
        gameState.completedMaterials.length;

    DOM.progressCount.textContent =
        `${completedCount}/6`;
}


/* =========================================================
   16. PORTAL
========================================================= */

function initializePortal() {
    DOM.portalButton.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();

            if (!gameState.portalUnlocked) {
                showNotification(
                    "Portal Terkunci",
                    "Selesaikan keenam materi terlebih dahulu."
                );

                return;
            }

            usePortal();
        }
    );

    DOM.portal.addEventListener(
        "click",
        (event) => {
            if (
                event.target.closest(
                    "#portal-button"
                )
            ) {
                return;
            }

            handlePortalRequest();
        }
    );

    updatePortalVisual();
}

function handlePortalRequest() {
    if (!gameState.gameStarted) {
        return;
    }

    const portalCenter =
        getElementWorldCenter(
            DOM.portal
        );

    const distance =
        distanceBetween(
            gameState.playerX,
            gameState.playerY,
            portalCenter.x,
            portalCenter.y
        );

    if (!gameState.portalUnlocked) {
        if (
            gameState.completedMaterials.length < 6
        ) {
            showNotification(
                "Portal Terkunci",
                "Selesaikan semua 6 materi untuk membuka portal."
            );
        }

        return;
    }

    if (distance <= INTERACTION_DISTANCE + 20) {
        usePortal();
        return;
    }

    setMovementTarget(
        portalCenter.x,
        portalCenter.y,
        () => {
            const newDistance =
                distanceBetween(
                    gameState.playerX,
                    gameState.playerY,
                    portalCenter.x,
                    portalCenter.y
                );

            if (
                newDistance <=
                INTERACTION_DISTANCE + 20
            ) {
                usePortal();
            }
        }
    );

    showNotification(
        "Menuju Portal",
        "Karakter sedang menuju portal."
    );
}

function unlockPortal() {
    if (gameState.portalUnlocked) {
        return;
    }

    if (
        gameState.completedMaterials.length !== 6
    ) {
        return;
    }

    gameState.portalUnlocked = true;

    updatePortalVisual();

    showNotification(
        "Portal Terbuka!",
        "Semua materi telah selesai dipelajari. Portal telah terbuka!"
    );
}

function updatePortalVisual() {
    const unlocked =
        gameState.completedMaterials.length === 6 ||
        gameState.portalUnlocked;

    gameState.portalUnlocked = unlocked;

    DOM.portal.dataset.status =
        unlocked ? "open" : "locked";

    DOM.portal.classList.toggle(
        "open",
        unlocked
    );

    DOM.portal.classList.toggle(
        "locked",
        !unlocked
    );

    DOM.portalButton.disabled =
        !unlocked;

    DOM.portalButton.textContent =
        unlocked
            ? "Masuk Portal"
            : "Portal Terkunci";

    DOM.portalDescription.textContent =
        unlocked
            ? "Semua materi selesai. Portal siap digunakan."
            : "Selesaikan seluruh materi untuk membuka portal.";
}

function usePortal() {
    if (!gameState.portalUnlocked) {
        return;
    }

    window.location.href = QUIZ_URL;
}


/* =========================================================
   17. PLAYER MOVEMENT
========================================================= */

function setMovementTarget(
    targetX,
    targetY,
    onArrive = null
) {
    const clamped =
        clampPlayerPosition(
            targetX,
            targetY
        );

    gameState.targetX = clamped.x;
    gameState.targetY = clamped.y;
    gameState.moving = true;
    gameState.onArrive = onArrive;
}

function stopMovement() {
    gameState.targetX = null;
    gameState.targetY = null;
    gameState.moving = false;
    gameState.onArrive = null;
}

function updatePlayerMovement(deltaTime) {
    if (
        !gameState.moving ||
        gameState.targetX === null ||
        gameState.targetY === null
    ) {
        return;
    }

    const deltaX =
        gameState.targetX -
        gameState.playerX;

    const deltaY =
        gameState.targetY -
        gameState.playerY;

    const distance =
        Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );

    if (
        distance <= 2 ||
        distance <=
            PLAYER_SPEED * deltaTime
    ) {
        gameState.playerX =
            gameState.targetX;

        gameState.playerY =
            gameState.targetY;

        gameState.moving = false;

        const callback =
            gameState.onArrive;

        gameState.targetX = null;
        gameState.targetY = null;
        gameState.onArrive = null;

        renderPlayer();

        if (typeof callback === "function") {
            callback();
        }

        return;
    }

    const directionX =
        deltaX / distance;

    const directionY =
        deltaY / distance;

    gameState.playerX +=
        directionX *
        PLAYER_SPEED *
        deltaTime;

    gameState.playerY +=
        directionY *
        PLAYER_SPEED *
        deltaTime;

    const clamped =
        clampPlayerPosition(
            gameState.playerX,
            gameState.playerY
        );

    gameState.playerX = clamped.x;
    gameState.playerY = clamped.y;

    renderPlayer();

    updateCameraToPlayer();
}

function clampPlayerPosition(x, y) {
    const playerWidth =
        DOM.player.offsetWidth || 86;

    const playerHeight =
        DOM.player.offsetHeight || 110;

    const minX = 10;
    const minY = 10;

    const maxX =
        WORLD_WIDTH -
        playerWidth -
        10;

    const maxY =
        WORLD_HEIGHT -
        playerHeight -
        10;

    return {
        x: Math.max(
            minX,
            Math.min(maxX, x)
        ),
        y: Math.max(
            minY,
            Math.min(maxY, y)
        )
    };
}

function renderPlayer() {
    DOM.player.style.left =
        `${gameState.playerX}px`;

    DOM.player.style.top =
        `${gameState.playerY}px`;
}


/* =========================================================
   18. CAMERA SYSTEM
========================================================= */

function getViewportSize() {
    const rect =
        DOM.viewport.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height
    };
}

function clampCamera(x, y) {
    const viewport =
        getViewportSize();

    const maxX =
        Math.max(
            0,
            WORLD_WIDTH -
                viewport.width
        );

    const maxY =
        Math.max(
            0,
            WORLD_HEIGHT -
                viewport.height
        );

    return {
        x: Math.max(
            0,
            Math.min(maxX, x)
        ),
        y: Math.max(
            0,
            Math.min(maxY, y)
        )
    };
}

function setCamera(x, y) {
    const clamped =
        clampCamera(x, y);

    gameState.cameraX =
        clamped.x;

    gameState.cameraY =
        clamped.y;

    renderCamera();
}

function renderCamera() {
    DOM.world.style.transform =
        `translate(${-gameState.cameraX}px, ${-gameState.cameraY}px)`;
}

function centerCameraOnPlayer() {
    const viewport =
        getViewportSize();

    const playerWidth =
        DOM.player.offsetWidth || 86;

    const playerHeight =
        DOM.player.offsetHeight || 110;

    const targetCameraX =
        gameState.playerX +
        playerWidth / 2 -
        viewport.width / 2;

    const targetCameraY =
        gameState.playerY +
        playerHeight / 2 -
        viewport.height / 2;

    setCamera(
        targetCameraX,
        targetCameraY
    );
}

function updateCameraToPlayer() {
    if (!gameState.gameStarted) {
        return;
    }

    const viewport =
        getViewportSize();

    const playerWidth =
        DOM.player.offsetWidth || 86;

    const playerHeight =
        DOM.player.offsetHeight || 110;

    const playerCenterX =
        gameState.playerX +
        playerWidth / 2;

    const playerCenterY =
        gameState.playerY +
        playerHeight / 2;

    const marginX =
        viewport.width * 0.28;

    const marginY =
        viewport.height * 0.28;

    let newCameraX =
        gameState.cameraX;

    let newCameraY =
        gameState.cameraY;

    const screenPlayerX =
        playerCenterX -
        gameState.cameraX;

    const screenPlayerY =
        playerCenterY -
        gameState.cameraY;

    if (screenPlayerX < marginX) {
        newCameraX =
            playerCenterX -
            marginX;
    } else if (
        screenPlayerX >
        viewport.width - marginX
    ) {
        newCameraX =
            playerCenterX -
            (viewport.width - marginX);
    }

    if (screenPlayerY < marginY) {
        newCameraY =
            playerCenterY -
            marginY;
    } else if (
        screenPlayerY >
        viewport.height - marginY
    ) {
        newCameraY =
            playerCenterY -
            (viewport.height - marginY);
    }

    setCamera(
        newCameraX,
        newCameraY
    );
}

function moveCameraBy(deltaX, deltaY) {
    setCamera(
        gameState.cameraX + deltaX,
        gameState.cameraY + deltaY
    );
}


/* =========================================================
   19. CAMERA DRAG + POINTER MOVEMENT
========================================================= */

function initializePointerControls() {
    DOM.viewport.addEventListener(
        "pointerdown",
        handleViewportPointerDown
    );

    DOM.viewport.addEventListener(
        "pointermove",
        handleViewportPointerMove
    );

    DOM.viewport.addEventListener(
        "pointerup",
        handleViewportPointerUp
    );

    DOM.viewport.addEventListener(
        "pointercancel",
        handleViewportPointerCancel
    );

    DOM.viewport.addEventListener(
        "pointerleave",
        handleViewportPointerCancel
    );

    DOM.viewport.addEventListener(
        "contextmenu",
        (event) => {
            event.preventDefault();
        }
    );
}

function handleViewportPointerDown(event) {
    if (!gameState.gameStarted) {
        return;
    }

    if (event.button !== undefined && event.button !== 0) {
        return;
    }

    gameState.pointer.active = true;
    gameState.pointer.dragging = false;

    gameState.pointer.startX =
        event.clientX;

    gameState.pointer.startY =
        event.clientY;

    gameState.pointer.lastX =
        event.clientX;

    gameState.pointer.lastY =
        event.clientY;

    gameState.pointer.totalMovement = 0;

    gameState.cameraDragStartX =
        gameState.cameraX;

    gameState.cameraDragStartY =
        gameState.cameraY;

    try {
        DOM.viewport.setPointerCapture(
            event.pointerId
        );
    } catch {
        /* Pointer capture is optional. */
    }
}

function handleViewportPointerMove(event) {
    if (
        !gameState.pointer.active ||
        !gameState.gameStarted
    ) {
        return;
    }

    const deltaX =
        event.clientX -
        gameState.pointer.lastX;

    const deltaY =
        event.clientY -
        gameState.pointer.lastY;

    const totalDeltaX =
        event.clientX -
        gameState.pointer.startX;

    const totalDeltaY =
        event.clientY -
        gameState.pointer.startY;

    gameState.pointer.totalMovement =
        Math.sqrt(
            totalDeltaX * totalDeltaX +
            totalDeltaY * totalDeltaY
        );

    if (
        gameState.pointer.totalMovement >= 8
    ) {
        gameState.pointer.dragging = true;
    }

    if (gameState.pointer.dragging) {
        setCamera(
            gameState.cameraX - deltaX,
            gameState.cameraY - deltaY
        );
    }

    gameState.pointer.lastX =
        event.clientX;

    gameState.pointer.lastY =
        event.clientY;
}

function handleViewportPointerUp(event) {
    if (!gameState.pointer.active) {
        return;
    }

    const wasDragging =
        gameState.pointer.dragging;

    const startX =
        gameState.pointer.startX;

    const startY =
        gameState.pointer.startY;

    gameState.pointer.active = false;
    gameState.pointer.dragging = false;

    try {
        DOM.viewport.releasePointerCapture(
            event.pointerId
        );
    } catch {
        /* Pointer capture may already be released. */
    }

    if (!wasDragging) {
        handleMapClick(
            event.clientX,
            event.clientY
        );
    }
}

function handleViewportPointerCancel(event) {
    if (!gameState.pointer.active) {
        return;
    }

    gameState.pointer.active = false;
    gameState.pointer.dragging = false;

    try {
        DOM.viewport.releasePointerCapture(
            event.pointerId
        );
    } catch {
        /* Pointer capture may already be released. */
    }
}

function handleMapClick(clientX, clientY) {
    const rect =
        DOM.viewport.getBoundingClientRect();

    const viewportX =
        clientX - rect.left;

    const viewportY =
        clientY - rect.top;

    const worldX =
        viewportX +
        gameState.cameraX;

    const worldY =
        viewportY +
        gameState.cameraY;

    const target =
        clampPlayerPosition(
            worldX,
            worldY
        );

    setMovementTarget(
        target.x,
        target.y
    );
}


/* =========================================================
   20. ELEMENT WORLD POSITION
========================================================= */

function getElementWorldCenter(element) {
    const left =
        parseFloat(
            element.style.left
        ) || element.offsetLeft;

    const top =
        parseFloat(
            element.style.top
        ) || element.offsetTop;

    return {
        x:
            left +
            element.offsetWidth / 2,

        y:
            top +
            element.offsetHeight / 2
    };
}


/* =========================================================
   21. CAMERA BUTTONS
========================================================= */

function initializeCameraControls() {
    if (!DOM.cameraControls) {
        return;
    }

    const controls =
        DOM.cameraControls.querySelectorAll(
            "[data-camera-direction]"
        );

    controls.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const direction =
                    button.dataset.cameraDirection;

                const viewport =
                    getViewportSize();

                const stepX =
                    Math.max(
                        80,
                        viewport.width * 0.35
                    );

                const stepY =
                    Math.max(
                        80,
                        viewport.height * 0.35
                    );

                switch (direction) {
                    case "up":
                        moveCameraBy(
                            0,
                            -stepY
                        );
                        break;

                    case "down":
                        moveCameraBy(
                            0,
                            stepY
                        );
                        break;

                    case "left":
                        moveCameraBy(
                            -stepX,
                            0
                        );
                        break;

                    case "right":
                        moveCameraBy(
                            stepX,
                            0
                        );
                        break;

                    case "center":
                        centerCameraOnPlayer();
                        break;

                    default:
                        break;
                }
            }
        );
    });
}


/* =========================================================
   22. NOTIFICATIONS
========================================================= */

function showNotification(
    title,
    message,
    duration = 3500
) {
    if (!DOM.notification) {
        return;
    }

    if (gameState.notificationTimer) {
        clearTimeout(
            gameState.notificationTimer
        );
    }

    DOM.notificationTitle.textContent =
        title;

    DOM.notificationMessage.textContent =
        message;

    DOM.notification.hidden = false;

    gameState.notificationTimer =
        window.setTimeout(
            () => {
                hideNotification();
            },
            duration
        );
}

function hideNotification() {
    if (!DOM.notification) {
        return;
    }

    DOM.notification.hidden = true;

    if (gameState.notificationTimer) {
        clearTimeout(
            gameState.notificationTimer
        );

        gameState.notificationTimer = null;
    }
}


/* =========================================================
   23. INSTRUCTION MODAL
========================================================= */

function showInstructionOnce() {
    let shouldShow = true;

    try {
        shouldShow =
            localStorage.getItem(
                "pancasilaGame_instructionSeen"
            ) !== "true";
    } catch {
        shouldShow = true;
    }

    if (!shouldShow) {
        return;
    }

    DOM.instructionModal.hidden = false;
}

function closeInstructionModal() {
    DOM.instructionModal.hidden = true;

    try {
        localStorage.setItem(
            "pancasilaGame_instructionSeen",
            "true"
        );
    } catch {
        /* Persistence is optional. */
    }

    if (DOM.startScreen.hidden) {
        document.body.style.overflow = "";
    }
}


/* =========================================================
   24. MENU
========================================================= */

function openMenuConfirmation() {
    if (!gameState.gameStarted) {
        return;
    }

    DOM.menuConfirmationModal.hidden = false;
}

function closeMenuConfirmation() {
    DOM.menuConfirmationModal.hidden = true;
}

function returnToMenu() {
    closeMenuConfirmation();
    closeMaterialModal();

    gameState.gameStarted = false;
    gameState.targetX = null;
    gameState.targetY = null;
    gameState.moving = false;
    gameState.activeMaterial = null;

    DOM.gameScreen.hidden = true;
    DOM.startScreen.hidden = false;

    document.body.style.overflow = "";

    updateProgress();
    updatePortalVisual();
}


/* =========================================================
   25. GENERIC MODAL CLOSE
========================================================= */

function handleModalOverlayClick(event) {
    const modalType =
        event.currentTarget.dataset.modalClose;

    if (modalType === "material") {
        closeMaterialModal();
    }

    if (modalType === "instruction") {
        closeInstructionModal();
    }

    if (modalType === "menu-confirmation") {
        closeMenuConfirmation();
    }
}


/* =========================================================
   26. RESIZE
========================================================= */

function handleResize() {
    if (!gameState.gameStarted) {
        return;
    }

    setCamera(
        gameState.cameraX,
        gameState.cameraY
    );
}


/* =========================================================
   27. UTILITY FUNCTIONS
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


/* =========================================================
   28. KEYBOARD ACCESS
========================================================= */

function initializeKeyboardControls() {
    document.addEventListener(
        "keydown",
        (event) => {
            if (!gameState.gameStarted) {
                return;
            }

            if (
                !DOM.materialModal.hidden ||
                !DOM.menuConfirmationModal.hidden
            ) {
                if (event.key === "Escape") {
                    closeMaterialModal();
                    closeMenuConfirmation();
                }

                return;
            }

            const viewport =
                getViewportSize();

            const step =
                Math.max(
                    50,
                    Math.min(
                        viewport.width,
                        viewport.height
                    ) * 0.12
                );

            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    moveCameraBy(
                        0,
                        -step
                    );
                    break;

                case "ArrowDown":
                    event.preventDefault();
                    moveCameraBy(
                        0,
                        step
                    );
                    break;

                case "ArrowLeft":
                    event.preventDefault();
                    moveCameraBy(
                        -step,
                        0
                    );
                    break;

                case "ArrowRight":
                    event.preventDefault();
                    moveCameraBy(
                        step,
                        0
                    );
                    break;

                case "Escape":
                    event.preventDefault();
                    openMenuConfirmation();
                    break;

                default:
                    break;
            }
        }
    );
}


/* =========================================================
   29. EVENT LISTENERS
========================================================= */

function bindEventListeners() {
    DOM.startButton.addEventListener(
        "click",
        startGame
    );

    DOM.playerNameInput.addEventListener(
        "input",
        () => {
            const value =
                DOM.playerNameInput.value.trim();

            DOM.playerNameLabel.textContent =
                value || DEFAULT_PLAYER_NAME;
        }
    );

    DOM.materialCompleteButton.addEventListener(
        "click",
        completeActiveMaterial
    );

    DOM.materialModalClose.addEventListener(
        "click",
        closeMaterialModal
    );

    DOM.notificationClose.addEventListener(
        "click",
        hideNotification
    );

    DOM.instructionModalClose.addEventListener(
        "click",
        closeInstructionModal
    );

    DOM.instructionUnderstandButton.addEventListener(
        "click",
        closeInstructionModal
    );

    DOM.menuButton.addEventListener(
        "click",
        openMenuConfirmation
    );

    DOM.menuConfirmationClose.addEventListener(
        "click",
        closeMenuConfirmation
    );

    DOM.menuCancelButton.addEventListener(
        "click",
        closeMenuConfirmation
    );

    DOM.menuConfirmButton.addEventListener(
        "click",
        returnToMenu
    );

    document
        .querySelectorAll(
            "[data-modal-close]"
        )
        .forEach((overlay) => {
            overlay.addEventListener(
                "click",
                handleModalOverlayClick
            );
        });

    initializePointerControls();
    initializeCameraControls();
    initializeKeyboardControls();
    initializeCropPointerEvents();

    window.addEventListener(
        "resize",
        handleResize
    );

    window.addEventListener(
        "beforeunload",
        clearCropObjectUrl
    );
}


/* =========================================================
   30. GAME LOOP
========================================================= */

function gameLoop(timestamp) {
    if (!gameState.lastFrameTime) {
        gameState.lastFrameTime =
            timestamp;
    }

    const deltaTime =
        Math.min(
            (timestamp -
                gameState.lastFrameTime) /
                1000,
            0.05
        );

    gameState.lastFrameTime =
        timestamp;

    if (gameState.gameStarted) {
        updatePlayerMovement(
            deltaTime
        );
    }

    requestAnimationFrame(
        gameLoop
    );
}


/* =========================================================
   31. START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        init();
        requestAnimationFrame(
            gameLoop
        );
    }
);
