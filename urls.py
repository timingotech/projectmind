from django.urls import path, include
from django.contrib.auth import views as auth_views
from .views import signup, login_view ,csrf_token

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    # path('resetpassword/', password_reset, name='password_reset'),
    # path('verification/', verification, name='verification'),
    # path('send-verification-email/', send_verification_email, name='send_verification_email'),
    path('csrf/', csrf_token, name='csrf_token'),
]


# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     )
# }
