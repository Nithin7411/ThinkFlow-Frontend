import { useLocation } from 'react-router-dom';
import NewStoryEditor from './newStoryEditor';

const AddStory = function () {
  const location = useLocation();
  const draft = location.state?.draft || {};

  return (
    <>
      <NewStoryEditor initialDraft={draft} />
    </>
  );
};

export default AddStory;
