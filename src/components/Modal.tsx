const Modal: React.FC<{
  children: React.ReactElement;
  onClose?: () => void;
  isHeader?: boolean;
  headerTitle?: string;
}> = ({ children, onClose, isHeader, headerTitle }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 bg-black bg-opacity-25 w-screen h-screen z-[999] grid place-items-center"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg relative max-w-lg w-full overflow-hidden"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div
          className="absolute top-4 right-4 text-2xl cursor-pointer hover:text-red-600 z-50"
          onClick={handleClose}
        >
          X
        </div>
        {isHeader && (
          <div className="bg-white px-6 py-4 mb-2 border-b border-b-muted font-bold">
            {headerTitle ?? "Header Title"}
          </div>
        )}
        <div className="max-h-[80vh] overflow-y-auto py-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
