import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';
import { blogDescription } from '../../Recoil';

const Editor = ({descriptionData}) => {
    const [description, setDescription] = useRecoilState(blogDescription);
    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} }
    });

    if (Quill && !quill) {
        Quill.register('modules/blotFormatter', BlotFormatter);
    }

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = descriptionData; // Set initial content
            quill.on('text-change', (delta, oldContents) => {
                console.log('Text change!');
                console.log(delta);

                let currentContents = quill.getContents();
                console.log(currentContents.diff(oldContents));

                // Update Recoil state with the current editor contents
                setDescription(quill.root.innerHTML);
            });
        }
    }, [quill, Quill, setDescription]);

    return (
        <div>
            <div ref={quillRef} />
        </div>
    );
};

export default Editor;
