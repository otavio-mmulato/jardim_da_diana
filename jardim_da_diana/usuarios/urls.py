from django.urls import path
from .views import UsuarioList, UsuarioDetail

urlpatterns = [
    path('', UsuarioList.as_view(), name='usuarios-list'),
    path('<int:pk>/', UsuarioDetail.as_view(), name='usuarios-detail'),
]
