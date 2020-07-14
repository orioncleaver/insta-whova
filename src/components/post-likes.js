import * as React from 'react';
import { AiOutlineHeart, AiOutlineMessage, AiOutlineUpload } from 'react-icons/ai';
import { MdBookmarkBorder } from 'react-icons/md'

class PostLikes extends React.Component {
    render () {
        return (
            <div>
                <div className='post-button-container'> 
                    <div className='post-interactions'>
                        <AiOutlineHeart />
                        <AiOutlineMessage />
                        <AiOutlineUpload />
                    </div>
                    <div className='post-bookmark'>
                        <MdBookmarkBorder />
                    </div>
                </div>
                <div className='post-likes'>
                    <span>56 Likes</span>
                </div>
            </div>

        )
    }
}

export default PostLikes;