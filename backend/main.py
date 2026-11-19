"""
Skin Disease Detection API Entrypoint
-------------------------------------
Compatibility entrypoint delegating to streamlined application in app.py.
"""

from app import app, create_app

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
