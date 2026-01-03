
const DeleteConfirmationPopup = ({togglePopup,fetchDrafts,draftId}) => {
  const handleDelete = async (draftId) => {
    try {
      const Draft = { draftId: draftId };
      console.log(JSON.stringify(Draft));
       await fetch(`${import.meta.env.VITE_API_URL}/draft`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Draft),
      });
      togglePopup();
      fetchDrafts();
    } catch (error) {
      console.log('Error deleting draft:', error);
    }
  };
  return(
<div className="backgroundBlur">
      <div className="confirmationPopUp">
        <h2>Confirm to delete?</h2>
        <div className="buttonsContainer">
          <button onClick={togglePopup} className="cancelButton">Cancel</button>
          <button onClick={() => handleDelete(draftId)} className="confirmButton">Confirm</button>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmationPopup;