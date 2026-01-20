import React from 'react';

const Modal = ({children, isOpen, onClose, tittle}) => {
    return <div className="fixed top-0 right-0 left-0 z-50 flex justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            {} 
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="">
                        {tittle}
                    </h3>

                    <button 
                        type="button"
                        className=""
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                {}
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    </div>
    
}

export default Modal;