from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password"
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
    
    password = serializers.CharField(
    write_only=True,
    validators=[validate_password]
    )

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
             raise serializers.ValidationError(
                  "Email already exists"
             )
        return value