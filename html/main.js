// Modal Management
const handleOpenCallOperation = () => {
    document.getElementById('call-modal').classList.remove('hidden');
    setTimeout(() => {
        window.callSubmit?.();
    }, 1000);
};

const handleCloseCall = () => {
    document.getElementById('call-modal').classList.add('hidden');
    window.location.reload();
};

const handleOpenChatOperation = () => {
    document.getElementById('chat-modal').classList.remove('hidden');
    window.chatSubmit?.();
};

const handleCloseChat = () => {
    document.getElementById('chat-modal').classList.add('hidden');
    window.location.reload();
};

const handleOpenVideoOperation = () => {
    document.getElementById('video-modal').classList.remove('hidden');
    window.videoSubmit?.();
};

const handleCloseVideo = () => {
    document.getElementById('video-modal').classList.add('hidden');
    window.location.reload();
};

// Interactive Demo Management
const handleInteractiveDemo1 = () => {
    document.getElementById('interactive-demo-modal').classList.remove('hidden');
    document.getElementById('interactive-iframe').src = 'https://demo.radius-ois.ai/agent-console';
    document.getElementById('demo-loading-text').textContent = 'Loading Agent Console Demo';
};

const handleInteractiveDemo2 = () => {
    document.getElementById('interactive-demo-modal').classList.remove('hidden');
    document.getElementById('interactive-iframe').src = 'https://demo.radius-ois.ai/reporting-tool';
    document.getElementById('demo-loading-text').textContent = 'Loading Reporting Tool Demo';
};

const handleInteractiveDemo3 = () => {
    document.getElementById('interactive-demo-modal').classList.remove('hidden');
    document.getElementById('interactive-iframe').src = 'https://demo.radius-ois.ai/playback-qa';
    document.getElementById('demo-loading-text').textContent = 'Loading Playback and QA Tool Demo';
};

const closeInteractiveDemo = () => {
    document.getElementById('interactive-demo-modal').classList.add('hidden');
    document.getElementById('interactive-iframe').src = '';
};

// Meeting Modal Management
const handleOpenMeeting = () => {
    document.getElementById('meeting-modal').classList.remove('hidden');
};

const closeMeetingModal = () => {
    document.getElementById('meeting-modal').classList.add('hidden');
};

// Survey Modal Management
const handleOpenSurvey = () => {
    window.open('https://forms.office.com/r/S8Ny8oUJ8p', '_blank');
};

// Iframe Load Handlers
const handleIframeLoad = () => {
    document.getElementById('demo-loading').classList.add('hidden');
};

const handleMeetingIframeLoad = () => {
    document.getElementById('meeting-loading').classList.add('hidden');
};

// Script Loading Functions
const loadChatScript = () => {
    if (!document.getElementById('chat_now')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'chat_now';
        script.text = `
            window.$EsyCht || (function (d, s) {
            var _e = $EsyCht = function (c) {
            _e._.push(c)
            }, $ = _e.s =
            d.createElement(s), e = d.getElementsByTagName(s)[0];
            _e.set = function (o) {_e.set._.push(o)
            };
            _e._ = [];
            _e.set._ = [];
            $.async = !0;
            $.setAttribute("charset", "utf-8");
            $.setAttribute("id", "cd");
            $.src = "https://demo.radius-ois.ai/robowebtools/assets/js/vis435net.js?8de1cacdcda71da3aa79";
            _e.t = +new Date;
            $.type = "text/javascript";
            e.parentNode.insertBefore($, e)
            })(document, "script");
        `;
        document.body.appendChild(script);
    }
};

const loadCallScript = () => {
    if (!document.getElementById('call_now')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'call_now';
        script.text = `
            window.$CallNow || (function (doc_Call, scr_Call) {
            var _e_CallNow = $CallNow = function (Ruvo_c) {
            _e_CallNow._.push(Ruvo_c)
            }, $ = _e_CallNow.s =
            doc_Call.createElement(scr_Call), e = doc_Call.getElementsByTagName(scr_Call)[0];
            _e_CallNow.set = function (o) {_e_CallNow.set._.push(o)
            };
            _e_CallNow._ = [];
            _e_CallNow.set._ = [];
            $.async = !0;
            $.setAttribute("charset", "utf-8");
            $.setAttribute("id", "call_now");
            $.src = "https://demo.radius-ois.ai/robowebtoolscall/assets/js/call_ui.js?e87274b76f0d82e1ffcf";
            _e_CallNow.t = +new Date;
            $.type = "text/javascript";
            e.parentNode.insertBefore($, e)
            })(document, "script");
        `;
        document.body.appendChild(script);
    }
};

const loadVideoScript = () => {
    if (!document.getElementById('Video_Now')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'Video_Now';
        script.text = `
            window.$RuvoChat || (function (doc_RuvoChat, scr_RuvoChat) {
            var _e_RuvoChat = $RuvoChat = function (Ruvo_c) {
            _e_RuvoChat._.push(Ruvo_c)
            }, $ = _e_RuvoChat.s =
            doc_RuvoChat.createElement(scr_RuvoChat), e = doc_RuvoChat.getElementsByTagName(scr_RuvoChat)[0];
            _e_RuvoChat.set = function (o) {_e_RuvoChat.set._.push(o)
            };
            _e_RuvoChat._ = [];
            _e_RuvoChat.set._ = [];
            $.async = !0;
            $.setAttribute("charset", "utf-8");
            $.setAttribute("id", "vd");
            $.src = "https://demo.radius-ois.ai/robowebtools/assets/js/ruvo_ui.js?8de1cacdcda71da3aa79";
            _e_RuvoChat.t = +new Date;
            $.type = "text/javascript";
            e.parentNode.insertBefore($, e)
            })(document, "script");
        `;
        document.body.appendChild(script);
    }
};

// Initialize all scripts on page load
document.addEventListener('DOMContentLoaded', () => {
    loadChatScript();
    loadCallScript();
    loadVideoScript();
});

// Glow effect animation
let glowIntensity = 0.6;
setInterval(() => {
    glowIntensity = Math.max(0.5, Math.min(0.8, glowIntensity + (Math.random() * 0.05 - 0.025)));
    const elements = document.querySelectorAll('[data-glow]');
    elements.forEach(el => {
        el.style.boxShadow = `0 0 ${20 + glowIntensity * 20}px rgba(${el.dataset.glow}, ${glowIntensity * 0.5})`;
        if (el.dataset.border) {
            el.style.borderColor = `rgba(${el.dataset.glow}, 0.3)`;
        }
    });
}, 1000); 