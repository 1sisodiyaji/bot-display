import { X } from 'lucide-react';
import ReactDOM from 'react-dom';

const InteractiveDemo = ({ onClose , url}) => {

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center`}
        >
            <div
                className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 border border-green-600 text-green-200 rounded-2xl p-6 w-5xl min-h-72 shadow-[0_0_6px_#00ff88] flex flex-col justify-between items-center"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full flex justify-end mb-2">
                    <X onClick={onClose} className="cursor-pointer" />
                </div>

                <div className="iframeBox">
                    <iframe src={url} loading="lazy" title="RADIUS Reporting & Analytics Tool" allow="clipboard-write" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullcreen className='iframeInner' ></iframe>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default InteractiveDemo;
