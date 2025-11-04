import { useEffect, useMemo, useState } from 'react'
import { DefaultSpinner, Tldraw, createTLStore, getSnapshot, loadSnapshot } from 'tldraw'
import { authRequest } from '../../services/auth'
import 'tldraw/tldraw.css'

// crediting https://tldraw.dev/examples/local-storage
function VisionBoard() {
    const store = useMemo(() => createTLStore(), [])
    const [loadingState, setLoadingState] = useState({ status: 'loading' })
    const [saving, setSaving] = useState(false)


    useEffect(() => {
        const fetchVisionBoard = async () => {
            setLoadingState({ status: 'loading' })
            try {
                console.log("call from fetchvision")
                const res = await authRequest({
                    method: 'get',
                    url: 'http://127.0.0.1:8000/api/visionboard/',
                })

                if (res.data.tldraw_data) {
                    console.log('snapshot from API:', res.data.tldraw_data)
                    loadSnapshot(store, res.data.tldraw_data)
                }

                setLoadingState({ status: 'ready' })
            } catch (err) {
                setLoadingState({ status: 'error', error: err.message })
            }
        }

        fetchVisionBoard()
    }, [store])

    async function handleSave() {
        setSaving(true)
        const snapshot = getSnapshot(store)
        try {
            await authRequest({
                method: 'put',
                url: 'http://127.0.0.1:8000/api/visionboard/',
                data: { tldraw_data: snapshot },
            })
            alert('vision board saved')
        } catch (err) {
            console.error('failed to save vision board:', err)
            alert('failed to save. Check console for details.')
        }
        setSaving(false)
    }

    if (loadingState.status === 'loading') {
        return (
            <div className="tldraw__editor">
                <h2><DefaultSpinner /></h2>
            </div>
        )
    }

    if (loadingState.status === 'error') {
        return (
            <div className="tldraw__editor">
                <h2>Error</h2>
                <p>{loadingState.error}</p>
            </div>
        )
    }

    return (

        <div
        className="tldraw__editor"
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '92vw',
                height: '95vh',
                position: 'fixed',
            }}
        >
            <h1>Vision Board</h1>
            <div
                style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexGrow: 1,
                    paddingBottom: "10px"
                }}
            >
                <Tldraw store={store} />
            </div>

            <button
                className="global-btn"
                onClick={handleSave}
                disabled={saving}
                style={{
                    marginLeft: 'auto'
                }}
            >
                {saving ? 'Saving...' : 'Save'}
            </button>
        </div>
    )
}

export default VisionBoard
