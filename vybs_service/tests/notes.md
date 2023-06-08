UNIT TESTS!
They don't talk to the database :)


1. Testing Library in requirements file (pytest) ✓
2. Convention: all tests need to live in a directory named tests  ✓
3. Convention: test_router_name.py // def test_router_name (): ✓
4. Python -m pytest (in the services' terminal, not test folder, you should see Dockerfile!) ✓
5. API client in the test code -- from fastapi.testclient import TestClient ✓
6. Import main/app into test code file -- this wraps App in test client
    from main import app // client = TestClient(app) ✓

