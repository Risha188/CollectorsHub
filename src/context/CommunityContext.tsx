import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from 'react';

interface CommunityContextType {
    likedPosts: number[];
    savedPosts: number[];

    toggleLike: (postId: number) => void;
    toggleSave: (postId: number) => void;

    isLiked: (postId: number) => boolean;
    isSaved: (postId: number) => boolean;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

interface CommunityProviderProps {
    children: ReactNode
}

export const CommunityProvider = ({
    children
}: CommunityProviderProps) => {
    const [likedPosts, setLikedPosts] = useState<number[]>(
        () => {
            const saved = localStorage.getItem("likedPosts");
            return saved ? JSON.parse(saved) : [];
        }
    )

    const [savedPosts, setSavedPosts] = useState<number[]>(
        () => {
            const saved = localStorage.getItem("savedPosts");
            return saved ? JSON.parse(saved) : [];
        }
    );

    // Save liked posts
    useEffect(() => {
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
    }, [likedPosts]);

    //Save bookmark posts
    useEffect(() => {
        localStorage.setItem("savedPosts", JSON.stringify(savedPosts))
    }, [savedPosts]);

    // Like / Unlike 
    const toggleLike = (postId: number) => {
        setLikedPosts((prev) => {
            if (prev.includes(postId)) {
                return prev.filter((id) => id !== postId);
            }

            return [...prev, postId];
        });
    };

    // Save / Unsave
    const toggleSave = (postId: number) => {
        setSavedPosts((prev) => {
            if (prev.includes(postId)) {
                return prev.filter((id) => id !== postId)
            }

            return [...prev, postId]
        });
    };

    const isLiked = (postId: number) => {
        return likedPosts.includes(postId);
    }

    const isSaved = (postId: number) => {
        return savedPosts.includes(postId);
    }

    return (
        <CommunityContext.Provider
            value={{
                likedPosts,
                savedPosts,
                toggleLike,
                toggleSave,
                isLiked,
                isSaved
            }}
        >
            {children}
        </CommunityContext.Provider>
    )
};

export const useCommunity = () => {
    const context = useContext(CommunityContext);

    if (!context) {
        throw new Error("useCollection must be used inside CollectionProvider");
    }

    return context;
}