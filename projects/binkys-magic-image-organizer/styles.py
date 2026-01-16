import streamlit as st

def apply_apple_styles():
    st.markdown("""
        <style>
        /* 1. Reset Font to Apple System */
        html, body, [class*="st-"] {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
        }

        /* 2. Hide Streamlit Header/Footer */
        #MainMenu {visibility: hidden;}
        header {visibility: hidden;}
        footer {visibility: hidden;}
        [data-testid="stHeader"] {display: none;}

        /* 3. Sidebar Vibrancy (Apple Sidebar look) */
        [data-testid="stSidebar"] {
            background-color: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(20px) !important;
            border-right: 1px solid rgba(0,0,0,0.1);
        }

        /* 4. Native Card Look */
        div[data-testid="stImage"] {
            border-radius: 12px !important;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: transform 0.2s ease;
        }
        div[data-testid="stImage"]:hover {
            transform: scale(1.02);
        }

        /* 5. Apple Primary Button */
        div.stButton > button {
            border-radius: 8px !important;
            background-color: #007AFF !important; /* Apple Blue */
            color: white !important;
            border: none !important;
            padding: 0.5rem 1rem !important;
            font-weight: 500 !important;
        }
        
        /* 6. Clean Grid spacing */
        .stColumn {
            padding: 10px !important;
        }

        /* 7. Typography Adjustments */
        h1, h2, h3 {
            font-weight: 700 !important;
            letter-spacing: -0.5px !important;
        }
        
        /* Hide deployment button */
        .stAppDeployButton {
            display: none;
        }
        </style>
    """, unsafe_allow_html=True)
