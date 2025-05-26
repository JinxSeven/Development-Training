using System;
using NUnit.Framework.Legacy;

namespace HPlusSport.Core.Test;

public class ShoppingCartTest
{
    [SetUp]
    public void Setup()
    {

    }

    [Test]
    public void ReturnArticleAddedToCart()
    {
        var item = new AddToCartItem()
        {
            Id = 42,
            Quantity = 5
        };

        var request = new AddToCartRequest()
        {
            Item = item
        };

        var manager = new ShoppingCartManager();

        AddToCartResponse response = manager.AddToCart(request);

        Assert.That(response, Is.Not.Null);
        Assert.That(response.CartItems, Does.Contain(item));
    }
}
