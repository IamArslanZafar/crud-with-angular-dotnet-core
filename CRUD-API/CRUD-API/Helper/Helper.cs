using System;

public static class Helper
{
    public static int GenerateUniqueId()
    {
        // You can implement your own logic to generate a unique ID.
        // Here, we're using a simple incremental approach for demonstration purposes.
        return Guid.NewGuid().GetHashCode();
    }
}
