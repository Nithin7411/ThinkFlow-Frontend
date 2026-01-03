import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Navbar/Navbar';
import parse from 'html-react-parser';
import fetchApi from '../script/fetchApi';
import StoriesButton from './storiesButton';
import moment from 'moment';
import DeleteConfirmationPopup from './DeleteConfirmation';
import { fromFirestoreTime } from '../dashboard/formatTime';


const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
  const [popupState, setPopupState] = useState(false);
  const [deleteDraftId,setDeleteDraftId] = useState();

  const togglePopup = (draftId) => {
    setPopupState((popupState) => !popupState);
    setDeleteDraftId(draftId);
  };
  const fetchDrafts = async () => {
    try {
      const data = await fetchApi('http://localhost:8000/user/stories');
      
      setDrafts(data.drafts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleDraftClick = (draft) => {
    navigate('/add-story', { state: { draft } });
  };

  const truncateContent = (content, length = 100) => {
    if (!content) return '';
    const plainText = content
      .map(block => block.data.text)
      .join(' ');
    const truncatedText = plainText.length > length ? plainText.slice(0, length) + '...' : plainText;
    return truncatedText;
  };

  return (
    <>
      <Header />
      <StoriesButton />
      {drafts.length === 0 ? (
        <p className='noDrafts'>No drafts available.</p>
      ) : (
        <ul className='drafts-list'>
          {drafts.map(draft => (
            <li
              key={draft.id}
              className='draft-item'
              onClick={() => handleDraftClick(draft)}
            >
              <h2 className='draft-title'>{draft.title ? parse(draft.title) : 'Untitled'}</h2>
              <p className='draft-content'>
                {parse(truncateContent(draft.content))}
              </p>
              <div className="published-on">
              Modified {fromFirestoreTime(draft.lastModified)}
                <button className="deleteIcon" onClick={(event) => {
                  event.stopPropagation();
                  togglePopup(draft.id);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {
        popupState && <DeleteConfirmationPopup togglePopup={togglePopup} draftId={deleteDraftId} fetchDrafts={fetchDrafts}/>
      }
    </>
  );
};

export default Drafts;
