const ConfirmDialog = ({ message, onCancel, onConfirm, confirming }) => {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal card" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={confirming}>
            {confirming ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
