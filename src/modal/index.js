import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  if (typeof document === 'undefined') {
    return null;
  }

  const backdrop = (
    <div
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0,0,0,.7)', top: 0, left: 0, right: 0, bottom: 0, position: 'fixed', zIndex: 9 }}
    />
  );

  const modal = (
    <div style={{ overflow: 'auto', maxHeight: 'calc(100% - 4rem)', backgroundColor: '#ccc', padding: 10, position: 'fixed', minHeight:200, maxWidth: '100%', width: 400, zIndex: 10 }}>
      <header>
        <button onClick={onClose}>close</button>
      </header>
      {children}
    </div>
  );

  return createPortal(
    <>
      {backdrop}
      {modal}
    </>
    ,
    document.getElementById('modal-root')
  );
}
