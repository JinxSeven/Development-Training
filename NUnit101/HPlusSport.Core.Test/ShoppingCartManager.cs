using System;

namespace HPlusSport.Core.Test;

public class ShoppingCartManager
{
    public AddToCartResponse AddToCart(AddToCartRequest request)
    {
#pragma warning disable CS8601 // Possible null reference assignment.
        return new AddToCartResponse()
        {
            CartItems = new AddToCartItem[] { request.Item }
        };
#pragma warning restore CS8601 // Possible null reference assignment.
    }
}
