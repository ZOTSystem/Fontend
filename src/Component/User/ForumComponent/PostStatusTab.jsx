import { useSearchParams } from 'react-router-dom';
const PostStatusTab = ({ statusList }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className='post-tab-container'>
            {statusList.map((status) => {
                const { id, name, title } = status;
                return (
                    <button
                        className={searchParams.get('status') === name ? 'post-tab-item active' : 'post-tab-item'}
                        key={id}
                        onClick={() => setSearchParams({ status: name })}
                    >
                        {title}
                    </button>
                );
            })}
        </div>
    );
};

export default PostStatusTab;
