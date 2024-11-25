import React from 'react'

function useBeforeUnload(callback) {
    React.useEffect (() =>{
        const beforeUnloadHandler = (e) =>{
            e.preventDefault ();
            callback && callback();
        }
        window.addEventListener("beforeunload", beforeUnloadHandler);
        return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
      }, []);
}

export default useBeforeUnload