document.getElementById('yes-btn').addEventListener('click', function() {
    showMessage('Yay! Kamu jadi cewekku love youuuu❤️❤️❤️❤️!');
    showFireworks();
    showLove();
    resetNoButton();
    resetCatImages();
    hideRain();
});

document.getElementById('no-btn').addEventListener('click', function() {
    showRain(); // Menampilkan efek hujan saat tombol "No" ditekan
    var bujukan = [
        'Terimaa ajaa donggg',
        'Gabolehhh Gituuu',
        'Pencet yang Sebelah Aja',
        'Kenapaa Begituuu',
        'Kamu Yakinnn???',
        'Pikir-pikir Lagi Dong',
        'Salah pencet dah kayaknya',
        'Beneran nih?',
        'Kasihan dong!',
        'Ayolah, pikir lagi!',
        'Masa sih nggak mau?',
        'Coba lagi, please!',
        'Serius nih?',
        'Yakin nggak mau?',
        'Please, reconsider!',
        'Aduh, coba lagi deh!',
        'Masa sih nggak tertarik?',
        'Ayolah, jangan gitu!',
        'Yuk, sekali lagi!'
    ];
    var index = Math.floor(Math.random() * bujukan.length);
    this.textContent = bujukan[index];
    
    // Mengganti gambar kucing menjadi no.gif saat tombol "No" ditekan
    var catImages = document.querySelectorAll('.cat');
    catImages.forEach(function(image) {
        image.src = 'no.gif';
    });
});

function showMessage(message) {
    document.getElementById('yes-no-container').style.display = 'none';
    var responseMessage = document.getElementById('response-message');
    responseMessage.textContent = message;
    document.getElementById('message').classList.remove('hidden');
}

function showFireworks() {
    var fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.classList.remove('hidden');

    setTimeout(function() {
        fireworksContainer.classList.add('hidden');
    }, 10000); // Tampilkan fireworks selama 10 detik
}

function resetNoButton() {
    var noButton = document.getElementById('no-btn');
    noButton.textContent = 'No';
}

function resetCatImages() {
    var catImages = document.querySelectorAll('.cat');
    var originalCatSrcs = ['cat1.gif', 'cat2.gif', 'cat3.gif', 'cat4.gif', 'cat5.gif'];
    catImages.forEach(function(image, index) {
        image.src = originalCatSrcs[index]; // Ganti dengan gambar asli kucing
    });
}

function showLove() {
    var loveContainer = document.createElement('div');
    loveContainer.classList.add('love');
    document.body.appendChild(loveContainer);

    var loveInterval = setInterval(function() {
        var love = document.createElement('div');
        love.classList.add('love');
        love.style.left = Math.random() * window.innerWidth + 'px';
        love.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(love);

        setTimeout(function() {
            love.remove();
        }, 2000);
    }, 300);

    setTimeout(function() {
        clearInterval(loveInterval);
    }, 10000); // Tampilkan love selama 10 detik
}

function hideRain() {
    var rainContainer = document.getElementById('rain-container');
    rainContainer.innerHTML = ''; // Kosongkan kontainer hujan
}

function showRain() {
    var rainContainer = document.getElementById('rain-container');

    // Buat 100 tetesan air secara acak
    for (var i = 0; i < 100; i++) {
        var raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = Math.random() * window.innerWidth + 'px'; // Letakkan di posisi horizontal secara acak
        raindrop.style.animationDelay = Math.random() + 's'; // Atur delay animasi secara acak untuk efek natural
        rainContainer.appendChild(raindrop); // Tambahkan tetesan air ke dalam kontainer hujan
    }
}

// Kode Fireworks yang sudah ada
function createFireworks() {
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    document.getElementById('fireworks-container').appendChild(canvas);

    var fireworks = [];
    var particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Firework(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 2;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.distanceToTarget = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.brightness = random(50, 70);
        this.targetRadius = 1;
    }

    Firework.prototype.update = function(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        if (this.distanceTraveled >= this.distanceToTarget) {
            createParticles(this.targetX, this.targetY);
            fireworks.splice(index, 1);
        } else {
            var vx = Math.cos(this.angle) * this.speed;
            var vy = Math.sin(this.angle) * this.speed;
            this.distanceTraveled = Math.sqrt((this.x + vx - this.x) ** 2 + (this.y + vy - this.y) ** 2);
            this.x += vx;
            this.y += vy;
        }
    };

    Firework.prototype.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsl(' + random(0, 360) + ', 100%, ' + this.brightness + '%)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2);
        ctx.stroke();
    };

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(1, 10);
        this.angle = random(0, Math.PI * 2);
        this.friction = 0.95;
        this.gravity = 1;
        this.hue = random(0, 360);
        this.brightness = random(50, 80);
        this.alpha = 1;
        this.decay = random(0.015, 0.03);
    }

    Particle.prototype.update = function(index) {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
            particles.splice(index, 1);
        }
    };

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        ctx.fill();
    };

    function createParticles(x, y) {
        var particleCount = 200; // Tambah jumlah partikel
        while (particleCount--) {
            particles.push(new Particle(x, y));
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        var i = fireworks.length;
        while (i--) {
            fireworks[i].draw();
            fireworks[i].update(i);
        }

        var j = particles.length;
        while (j--) {
            particles[j].draw();
            particles[j].update(j);
        }
    }

    function launchFirework() {
        var startX = window.innerWidth / 2;
        var startY = window.innerHeight;
        var targetX = random(0, window.innerWidth);
        var targetY = random(0, window.innerHeight / 2);
        fireworks.push(new Firework(startX, startY, targetX, targetY));
    }

    setInterval(launchFirework, 100); // Tambah frekuensi peluncuran
    loop();
}

createFireworks();
