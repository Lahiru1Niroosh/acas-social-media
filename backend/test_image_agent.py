from backend.agents.image_agent import ImageAgent


def test_download_image(monkeypatch):
    """Ensure ``download_image`` returns raw bytes without contacting the
    network.  The real implementation uses ``requests.get`` so we monkey-patch
    it out and supply a predictable response.
    """
    agent = ImageAgent()
    dummy_bytes = b"\x00\x01\x02"

    class DummyResponse:
        content = dummy_bytes
        def raise_for_status(self):
            pass

    monkeypatch.setattr("requests.get", lambda url, timeout: DummyResponse())
    data = agent.download_image("http://example.com/foo")
    assert data is dummy_bytes
    assert isinstance(data, bytes)


def test_analyze_smoke(monkeypatch):
    """Standard smoke test for ``analyze`` that avoids network I/O.
    ``download_image`` and the underlying predictor are both patched to
    eliminate external dependencies.
    """
    agent = ImageAgent()
    # stub out downloading and prediction so we can assert result structure
    monkeypatch.setattr(agent, "download_image", lambda url: b"IMG")
    monkeypatch.setattr(agent.predictor, "predict", lambda img: {
        "label": "REAL",
        "confidence": 0.5,
        "raw_prob_real": 0.5,
    })

    result = agent.analyze("http://example.com/foo")
    assert isinstance(result, dict)
    assert "label" in result
    assert "confidence" in result
