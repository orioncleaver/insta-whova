import * as React from 'react';
import { AiOutlineUser } from 'react-icons/ai'
import { MdMoreHoriz } from 'react-icons/md';
class PostHeader extends React.Component {
    
    render () {
        const { username } = this.props;

        return (
            <div className='post-header-container'> 
                <div className='post-header-main'>
                    <div className='user-profile-picture'>
                        <AiOutlineUser />
                    </div>
                    <div className='post-header-content'>
                        <h5>{username}</h5>
                        <p>Four Seasons Hotel Hampshire, England</p>
                    </div>
                </div>
                <div className='post-header-more'>
                    <MdMoreHoriz />
                </div>
            </div>
        )
    }
}

export default PostHeader;